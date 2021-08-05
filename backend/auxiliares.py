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
    
    #quando tamano == 1 verifica para numeros 
    if(len(sol)==1 and len(ans) ==1):
        if(sol[0]==ans[0]):
            return (ommited, wrongs, repeated, exchange, other)
        else : 
            return (ommited, 1, repeated, exchange, other)

    if(len(sol)==1):
        sol=removing_special_characters(sol)
        if(sol[0]==ans[0]):
            currsubseq.append(ans[j])
            currsubseq.insert(0, "!")
            seqs.append(currsubseq)
            return (ommited, wrongs, repeated, exchange, other, seqs)
        else : 
            currsubseq.insert(0, "!")
            seqs.append(currsubseq)
            return (ommited, 1, repeated, exchange, other,seqs)


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
    numbers = ["um" ,"dois","três","quatro","cinco","seis","sete","oito" , "nove"]

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

                    if textJoin == "1":
                        textJoin = "um"
                    elif textJoin == "2":
                        textJoin= "dois"
                    elif textJoin == "3":
                        textJoin= "três"
                    elif textJoin == "4":
                        textJoin= "quatro"
                    elif textJoin == "5":
                        textJoin= "cinco"
                    elif textJoin == "6":
                        textJoin= "seis"
                    elif textJoin == "7":
                        textJoin= "sete"
                    elif textJoin == "8":
                        textJoin= "oito"
                    elif textJoin == "9":
                        textJoin= "nove"
                    if textJoin in colours:
                        result.append(textJoin)
                    if textJoin in numbers :
                        result.append(textJoin)
                        
                i = i + 1
            else:
                i = i + 1
            aux = []
    #app.logger.info(result)
    return result