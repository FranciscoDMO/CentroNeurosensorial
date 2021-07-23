def algoritmo(sol, ans):
    seqs = []
    currsubseq = []
    i = 0
    j = 0
    ommited = 0
    wrongs = 0
    repeated = 0
    exchange = 0
    other = 0

    while i < len(sol) and j < len(ans):
        if sol[i] == ans[j]:
            currsubseq.append(ans[j])
            i = i + 1
            j = j + 1

        else:
            if len(currsubseq) == 0:
                #REPETICAO
                if i > 0 and (ans[j] == ans[j - 1] and ans[j + 1] == sol[i]):
                    j = j + 1
                    repeated = repeated + 1

                #PERMUTA
                elif i < len(sol) - 1 and j < len(ans) - 1 and (sol[i + 1] == ans[j] and sol[i] == ans[j + 1]):
                    i = i + 2
                    j = j + 2
                    wrongs = wrongs + 2
                    exchange = exchange + 1
                
                #ERRO
                elif i < len(sol) - 1 and j < len(ans) - 1 and (sol[i + 1] == ans[j + 1]):
                    i = i + 1
                    j = j + 1
                    wrongs = wrongs + 1

                #OMISSÂO
                elif i < len(sol) - 1 and sol[i + 1] == ans[j]:
                    i = i + 1
                    ommited = ommited + 1

                else:
                    #app.logger.info("Entrou num caso nao coberto")
                    other = other + 1
                    i = i + 1
                    j = j + 1

            else:
                currsubseq.insert(0, "!")
                seqs.append(currsubseq)
                currsubseq = []

    if i < len(sol):
        ommited += len(sol) - i - 1
    currsubseq.insert(0, "!")
    seqs.append(currsubseq)
    
    #app.logger.info(seqs)
    
    return (ommited, wrongs, repeated, exchange, other, seqs)

def removing_special_characters(text):
    #app.logger.info("ENTROU NO REMOVING")
    colours = ["azul", "amarelo", "vermelho", "verde", "preto", "roxo", "laranja", "branco"]
    geometric_forms = ["triângulo", "retângulo", "quadrado", "círculo"]

    text = ''.join([str(elem) for elem in text]).lower()
    if text[-1] != "." or text[-1] != " ":
        text= text +'.'
    text = text.split(",")
    text = ' '.join(text)
    text = text.split(".")
    text = ' '.join(text)

    aux = []
    result = []
    i = 0
    #app.logger.info(len(text))
    while i < len(text):
        #app.logger.info(i)
        if text[i] != " "  :
            aux.append(text[i])
            i = i + 1
        else:
            if len(aux) > 0:
                if aux[-1] == "a":
                    aux[-1] = "o"
                if aux[-1] == "s":
                    aux.pop(-1)
                textJoin = ''.join(aux)


                if textJoin in geometric_forms:
                    aux2 = []
                    i += 1
                    while i < len(text) and text[i] != " ":
                        aux2.append(text[i])
                        i += 1

                    colour = ''.join(aux2)

                    if colour in colours:
                        res = textJoin + " " + colour
                        result.append(res)

                else:
                    if textJoin == "azui":
                        textJoin = "azul"

                    if textJoin in colours:
                        result.append(textJoin)
                i = i + 1
            else:
                i = i + 1
            aux = []
    #app.logger.info(result)
    return result