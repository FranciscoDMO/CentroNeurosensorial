solution = ["azul", "vermelho", "verde", "preto", "amarelo", "vermelho", "preto", "azul", "amarelo", "verde",
"verde", "amarelo", "preto", "vermelho", "azul", "verde", "vermelho", "azul", "preto", "amarelo",
"verde", "vermelho", "amarelo", "azul", "preto", "preto", "azul", "amarelo", "vermelho", "verde",
"amarelo", "preto", "azul", "vermelho", "verde", "azul", "vermelho", "preto", "amarelo", "verde", 
"amarelo", "vermelho", "verde", "vermelho", "azul", "preto", "amarelo", "verde", "azul", "vermelho"]

'''
answer1 = ["vermelho", "verde", "preto", "amarelo", "vermelho", "preto", "azul", "amarelo", "verde",
"verde", "amarelo", "vermelho", "vermelho", "vermelho", "verde", "vermelho", "azul", "preto", "amarelo",
"verde", "vermelho", "amarelo", "azul", "preto", "vermelho", "azul", "amarelo", "vermelho", "verde",
"amarelo", "preto", "azul", "preto", "verde", "azul", "vermelho", "preto", "amarelo", "verde", 
"amarelo", "vermelho", "verde", "vermelho", "azul", "amarelo", "verde", "azul", "vermelho"]
'''
'''
#Erros: 1; Omissões:2 ; Palavras a mais: 2
answer2 = ["azul", "vermelho", "verde", "amarelo", "vermelho", "preto", "azul", "amarelo", "verde",
"verde", "amarelo", "preto", "vermelho", "azul", "verde", "vermelho", "amarelo", "preto", "preto", "amarelo",
"verde", "vermelho", "amarelo", "azul", "preto", "preto", "azul", "amarelo", "vermelho", "verde",
"amarelo", "preto", "azul", "vermelho", "verde", "vermelho", "preto", "preto", "amarelo", "verde", 
"amarelo", "vermelho", "verde", "vermelho", "azul", "preto", "amarelo", "verde"]

#Erros: 4; Omissões:2 ; Palavras a mais: 0
answer = ["vermelho", "verde", "preto", "amarelo", "vermelho", "preto", "azul", "amarelo", "verde",
"verde", "amarelo", "vermelho", "vermelho", "vermelho", "verde", "vermelho", "azul", "preto", "amarelo",
"verde", "vermelho", "amarelo", "azul", "preto", "vermelho", "azul", "amarelo", "vermelho", "verde",
"amarelo", "preto", "azul", "preto", "verde", "azul", "vermelho", "preto", "amarelo", "verde", 
"amarelo", "vermelho", "verde", "vermelho", "azul", "amarelo", "verde", "azul", "vermelho"]
'''
#Erros: 1; Omissões:0; Palavras a mais: 1
answer = ["azul", "vermelho", "verde", "preto", "amarelo", "vermelho", "preto", "azul", "amarelo", "verde",
"verde", "amarelo", "preto", "vermelho", "azul", "verde", "vermelho", "amarelo", "preto","preto", "amarelo",
"verde", "vermelho", "amarelo", "azul", "preto", "preto", "azul", "amarelo", "vermelho", "verde",
"amarelo", "preto", "azul", "vermelho", "verde", "azul", "vermelho", "preto", "amarelo", "verde", 
"amarelo", "vermelho", "verde", "vermelho", "azul", "preto", "amarelo", "verde", "azul", "vermelho"]

def longestCommonSubSeq(i,j,sol,ans,longsubseq,currsubseq,ommited,wrongs):
    if i >= len(sol):
        print('Chegou ao fim a solucao')
        print('Ommited = ' , ommited)
        print('Wrongs = ' , wrongs)
        print(longsubseq)
    
    elif j >= len(ans):
        print('Chegou ao fim a resposta')
        print('Ommited = ' , ommited)
        print('Wrongs = ' , wrongs)
        print(longsubseq)
    
    elif sol[i] == ans[j]:
        currsubseq.append(ans[j])
        longestCommonSubSeq(i+1,j+1,sol,ans,longsubseq,currsubseq,ommited,wrongs)

    elif sol[i] != ans[j]:
        if len(currsubseq) > len(longsubseq):
            longsubseq = currsubseq
            currsubseq = []
        else:
            currsubseq = []

        auxi = 1
        encontrou = False
        while auxi <= ommited:
            if i + auxi < len(sol):
                if sol[i + auxi] == ans[j]:
                    encontrou = True
                    break
                auxi = auxi + 1
            else: 
                break
        
        if encontrou == True:
            longestCommonSubSeq(i+auxi,j,sol,ans,longsubseq,currsubseq,ommited,wrongs)

        elif encontrou == False:
            print('Incremento do wrongs')
            print('sol[i] = ' , sol[i] , '; i =' , i)
            print('ans[j] = ' , ans[j] , '; j =' , j)
            longestCommonSubSeq(i+1,j+1,sol,ans,longsubseq,currsubseq,ommited,wrongs + 1)

text = " amarelo"
