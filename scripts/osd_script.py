import json
import random
from time import sleep

import osd_mails

"""
Script designed to refine (i.e. add references) and send mails to the participants of the speeddating event.
The data is expected to be in the file "speeddating.json" and the refined data will be saved in "speeddating-references.json".
Some tinkering with the data might be needed.
@author Benjamin 
"""


def refine_data():
    with open("speeddating.json", "r", encoding='utf-8') as f:
        data = json.load(f)

    all_refs = []
    for person in data:
        referenced = []
        assigned_number = person['assignedNumber']
        for other in data:
            references = other['references']
            for reference in references:
                if len(reference) == 0:
                    continue
                if reference[0] != assigned_number:
                    continue
                other_name = other['name'] if 'name' in other else ''
                referenced.append({"msg": reference[1], "mail": other['email'], "name": other_name})

        print("Person %s is referred by %s" % (person['email'], referenced))
        name = person['name'] if 'name' in person else ''
        all_refs.append({'email': person['email'], 'name': name, 'referred_by': referenced, 'send_mail': False})

    with open("speeddating-references.json", "w", encoding='utf-8') as f:
        json.dump(all_refs, f, indent=4, ensure_ascii=False)


def send_mails(amount):
    osd_mails.login(osd_mails.user, osd_mails.pswd)
    with open("speeddating-references.json", "r", encoding='utf-8') as f:
        data = json.load(f)

    send = 0
    for person in data:
        if send >= amount:
            break
        if person['send_mail']:
            continue
        if len(person['referred_by']) == 0:
            continue
        name = ' ' + person['name'] if 'name' in person else ' '
        text = f"""\
Sei gegrüßt{name}!
Dies ist eine automatisch generierte Nachricht.

Du hast deine E-Mail-Adresse für das Lerngruppenspeeddating angemeldet.
Folgende Personen haben deine ID eingegeben:
"""
        for ref in person['referred_by']:
            if ref['msg'] == '':
                if ref['name'] == '':
                    text += f" - {ref['mail']}\n"
                else:
                    text += f" - {ref['name']} ({ref['mail']})\n"
            else:
                if ref['name'] == '':
                    text += f" - {ref['mail']}: {ref['msg']}\n"
                else:
                    text += f" - {ref['name']} ({ref['mail']}): {ref['msg']}\n"

        text += """\
        
Viele Grüße!
Benjamin und das OPhasen-Team"""

        print("\n" + text)
        osd_mails.send_mail(osd_mails.sender_mail, person['email'], text)
        person['send_mail'] = True
        send += 1
        sleep(6 + random.randint(0, 5))

    with open("speeddating-references.json", "w", encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


# refine_data()
# send_mails(20)
