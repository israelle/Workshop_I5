#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Permet l'affichage des accents

import random
import numpy
import math
import csv
import time
import urllib.request, json 

import sys
from deap import algorithms
from deap import base
from deap import creator 
from deap import tools
from math import *
from random import randint

#ingrendientFourni = sys.argv[1]


ingrendientFourni = sys.argv[1:] #retire la premiere occurence du tableau

print(ingrendientFourni)
def truncate(number, digits) -> float:
    stepper = pow(10.0, digits)
    return math.trunc(stepper * number) / stepper

listeIngredients= []
listeIngredients.append("vide");

with urllib.request.urlopen("http://semantic-bus.org/data/api/i5-donnees-drive") as url:
    donnees = json.loads(url.read().decode())
    
for data in donnees:
    listeIngredients.append(data);


# Mehdi : NB dingredient manquants
NBMANQUE =  5 - len(ingrendientFourni)
print("Mehdi : NB dingredient manquants : ")
print(NBMANQUE)

# Nombre de genes (groupe de 6 pokémons)
# Creation de la suite à chercher
NB_PARAMETRES = NBMANQUE

# on cherche 0 en considérant que tous les pokémons
# dans la fonction d'évaluation
VALEUR_VISEE = 0


# Min et max pour le tirage aleatoire des gênes (nombre d'ingrédients différents)
INT_MIN = 1
INT_MAX = 75

# Nombre de generations
NGEN = 5

# Taille HallOfFame
THOF = 1

# Taille population
MU = 50

# Nombre d'enfant produit a chaque generation
LAMBDA = MU
# Probabite de crossover pour 2 individus
CXPB = 0.7
# Probabilite de mutation d'un individu
MUTPB = 0.3

# Algorithme utilise : eaSimple (simple GA), eaMuCommaLambda (evolutionary algorithm mu + lambda), eaGenerateUpdate (ask-tell model), eaMuCommaLambda (evolutionary algorithm mu, lambda),
METHODE = 1

# Creation des outils et population
creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

toolbox = base.Toolbox()
toolbox.register("indices", randint, INT_MIN, INT_MAX)
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.indices, n=NB_PARAMETRES)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)


# fonction de fitness
def evaluate(individual):
    
    ecart = 50
    groupe = []
    #print(individual)

    # gestion du total du prix
    
    totalPriceA = 0
    totalPriceC = 0
    totalPriceS = 0
    totalPriceL = 0
    totalPriceI = 0
    
    for i in range(0,NBMANQUE):
        coeff = 0.2
        if listeIngredients[individual[i]]["I"]==1:
            coeff=0.01
        totalPriceA = totalPriceA + float(listeIngredients[individual[i]]["D"])*coeff
        totalPriceC = totalPriceC + float(listeIngredients[individual[i]]["E"])*coeff
        totalPriceS = totalPriceS + float(listeIngredients[individual[i]]["F"])*coeff
        totalPriceL = totalPriceL + float(listeIngredients[individual[i]]["G"])*coeff
        totalPriceI = totalPriceI + float(listeIngredients[individual[i]]["H"])*coeff
        
        #print(listeIngredients[individual[i]]["B"])
    
    totalPrice = totalPriceA

    #if totalPriceC < totalPrice:
    #    totalPrice = totalPriceC

    #if totalPriceS < totalPrice:
    #    totalPrice = totalPriceS

    #if totalPriceL < totalPrice:
    #    totalPrice = totalPriceL

    #if totalPriceI < totalPrice:
    #    totalPrice = totalPriceI
 
    ecart = ecart + totalPrice
    
    # gestion de la santé
    sante = 0
    for i in range(0,NBMANQUE):
        sante = sante + float(listeIngredients[individual[i]]["C"])
    
    sante = sante/5
    ecart = ecart - sante
    
    #permet d'éviter les doublons : list(set() vire les doublons et on compare la taille du tableau tronqué avec l'autre
    for i in range(0,NBMANQUE):
        groupe.append(individual[i])
        
    cleanedList = list(set(groupe))
    if len(groupe) != len(cleanedList):
        ecart = ecart + 2000     
    #print(ecart)
        
    return (ecart, individual)

# Suite des outils
toolbox.register("mate", tools.cxOnePoint)
toolbox.register("mutate", tools.mutShuffleIndexes, indpb=0.1)
toolbox.register("select", tools.selTournament, tournsize=3)
toolbox.register("evaluate", evaluate)

def main():
    pop = toolbox.population(n=MU)
    hof = tools.HallOfFame(maxsize=THOF)
    stats=0
    if METHODE == 1:
        pop, logbook = algorithms.eaSimple(pop, toolbox, CXPB, MUTPB, NGEN, halloffame=hof)
    
    elif METHODE == 2:
        pop, logbook = algorithms.eaMuPlusLambda(pop, toolbox, MU, LAMBDA, CXPB, MUTPB, NGEN, stats, halloffame=hof)
        
    elif METHODE == 3:
        pop, logbook = algorithms.eaGenerateUpdate(toolbox, NGEN, stats, hof) 
        
    elif METHODE == 4:
        pop, logbook = algorithms.eaMuCommaLambda(pop, toolbox, MU, LAMBDA, CXPB, MUTPB, NGEN, halloffame=hof)    

    return pop, hof, logbook
                 
if __name__ == "__main__":
    pop, hof, logbook = main()
    """   
    import matplotlib.pyplot as plt
    
    gen = logbook.select("gen")
    dist_mins = logbook.chapters["groupe"].select("min")  
    dist_maxs = logbook.chapters["groupe"].select("max")
    dist_avgs = logbook.chapters["groupe"].select("avg")
    
    nrj_mins = logbook.chapters["energie"].select("min")  
    nrj_maxs = logbook.chapters["energie"].select("max")    
    nrj_avgs = logbook.chapters["energie"].select("avg")
    
    dist_var = logbook.chapters["groupe"].select("var")
    nrj_var = logbook.chapters["energie"].select("var")
    velocite = logbook.chapters["velocite"].select("max")
    alpha = logbook.chapters["alpha"].select("max")
    
    fig = plt.figure()
    
    ax1 = plt.subplot(1,2,1)
    line1 = ax1.plot(gen, dist_avgs, "blue", linewidth=2.5, label="Valeur")
    plt.fill_between(gen, dist_mins, dist_maxs, color='blue',  alpha=.25)
    plt.ylim(0,VALEUR_VISEE*4)
    ax1.set_xlabel("Generation")
    ax1.set_ylabel("Valeur", color="b")
          
    ax3 = plt.subplot(1,2,2)
    line3 = ax3.plot(gen, dist_var, "blue", label="Variance (groupe)")
    ax3.set_xlabel("Generation")
    ax3.set_ylabel("Variance", color="blue")    
"""
    listeIngredients= []
    listeIngredients.append("vide");
    
    with urllib.request.urlopen("http://semantic-bus.org/data/api/i5-donnees-drive") as url:
        donnees = json.loads(url.read().decode())
        
    for data in donnees:
        listeIngredients.append(data);
    
    totalPriceA = 0
    totalPriceC = 0
    totalPriceS = 0
    totalPriceL = 0
    totalPriceI = 0
    
    sante = 0
    for i in range(0,NBMANQUE):
        coeff = 1    
        sante = sante + float(listeIngredients[hof[0][i]]["C"])
                
        if listeIngredients[hof[0][i]]["I"]==1:
            coeff=0.01
        totalPriceA = totalPriceA + float(listeIngredients[hof[0][i]]["D"])*coeff
        totalPriceC = totalPriceC + float(listeIngredients[hof[0][i]]["E"])*coeff
        totalPriceS = totalPriceS + float(listeIngredients[hof[0][i]]["F"])*coeff
        totalPriceL = totalPriceL + float(listeIngredients[hof[0][i]]["G"])*coeff
        totalPriceI = totalPriceI + float(listeIngredients[hof[0][i]]["H"])*coeff
        
        #print(listeIngredients[hof[0][i]]["B"], listeIngredients[hof[0][i]]["I"])
    
    sante = sante/5
    totalPrice = totalPriceA
    magasin = "Auchan"
    if totalPriceC < totalPrice:
        totalPrice = totalPriceC
        magasin = "Carrefour"
    if totalPriceS < totalPrice:
        totalPrice = totalPriceS
        magasin = "Super U"
    if totalPriceL < totalPrice:
        totalPrice = totalPriceL
        magasin = "Leclerc"
    if totalPriceI < totalPrice:
        totalPrice = totalPriceI
        magasin = "Intermarché"
    
    #print("Le magasin le moins cher pour cette recette est", magasin, "au prix de", truncate(totalPrice,2),"€")
    #print(truncate(totalPriceA,2))
    #print(truncate(totalPriceC,2))
    #print(truncate(totalPriceS,2))
   ## print(truncate(totalPriceL,2))
   # print(truncate(totalPriceI,2))
    #print(sante)

    arguments = ""
    #arguments=listeIngredients[hof[0][0]]["B"]+","+listeIngredients[hof[0][1]]["B"]+","+listeIngredients[hof[0][2]]["B"]+","+listeIngredients[hof[0][3]]["B"]+","+listeIngredients[hof[0][4]]["B"]+","+ingrendientFourni

    for i in range(NBMANQUE):
        arguments+= str(listeIngredients[hof[0][i]]["B"]+",")

    for f in range(len(ingrendientFourni)):
        arguments+= str(ingrendientFourni[f]+",")


    print(arguments)
    #urllib.parse.urlencode(arguments)
   # print("http://semantic-bus.org/data/api/i5-bouffetout?i="+arguments)
    #input("Terminé ? Appuyez sur une touche")
    with urllib.request.urlopen("http://semantic-bus.org/data/api/i5-bouffetout?i="+arguments.replace(' ','%20')) as url:
    #with urllib.request.urlopen("http://semantic-bus.org/data/api/i5-bouffetout?i="+urllib.parse.urlencode(arguments)) as url:
        recette = json.loads(url.read().decode())
        #print(all_data)
    
    listeI = []
    #print(recette[0]['titre'])

    for data in recette:
        
        # toutes les titres des recettes
        #print(data['titre'])
        #listeT.append(data['titre'])
        #print(data['ingredients'])
        
        for ingredients in data['ingredients']:
            # tous les ingredients
            listeI.append(ingredients['nom'])
            
        break    
    
    #print(listeI)
    res = dict();
    res["title"] = recette[0]['titre']
    res["ingredients"] = listeI

    print(res)
    #input("Terminé ? Appuyez sur une touche")