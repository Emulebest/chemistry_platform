import subprocess

import numpy
import pandas as pd
from pdflatex import PDFLaTeX

from sklearn import linear_model

from qsar.aco.ant_colony import BinaryFeatureSelectionAntColony


def main(file_path: str, y_column_name: str, ants_amount: int, iterations: int, score_weight: int, count_weight: int):
    data = pd.read_csv(file_path, sep=',', header=0)
    column_names_in_order = [name for name in data.columns if name != y_column_name]
    column_names_in_order.append(y_column_name)
    data = data.reindex(columns=column_names_in_order)
    ant_colony = BinaryFeatureSelectionAntColony(ants_amount, iterations, 0.05, data, score_weight, count_weight)
    result_path = ant_colony.run()
    print(f"Result {result_path}")
    remaining_coef = []
    for i in result_path[0]:
        if i[1] == 1:
            remaining_coef.append(column_names_in_order[i[0]])
        else:
            del data[column_names_in_order[i[0]]]
    y = data[y_column_name].values
    xs = data.iloc[:, :len(data.columns) - 1].values
    regr = linear_model.LinearRegression().fit(xs, y)
    coef = numpy.round(regr.coef_, 5)
    intercept = round(regr.intercept_, 5)
    formula = f"{y_column_name}= "
    for i in range(len(remaining_coef)):
        if i + 1 < len(coef):
            if coef[i + 1] > 0:
                formula += f"{abs(coef[i])}*{remaining_coef[i]} + "
            else:
                formula += f"{abs(coef[i])}*{remaining_coef[i]} - "
        else:
            formula += f"{abs(coef[i])}*{remaining_coef[i]} "
    if intercept > 0:
        formula += f"+ {abs(intercept)}"
    else:
        formula += f"- {abs(intercept)}"
    return formula


def run(file_path: str, y_column_name: str, ants_amount: int, iterations: int, score_weight: int, count_weight: int):
    formula = main(file_path, y_column_name, ants_amount, iterations, score_weight, count_weight)
    # path = f"../static/uploads/{output_filename}.tex"
    # with open(path, "w") as file:
    #     file.write("\\documentclass[12pt]{article}")
    #     file.write("\\usepackage{amsmath}")
    #     file.write("\\usepackage{graphicx}")
    #     file.write("\\usepackage{hyperref}")
    #     file.write("\\usepackage[latin1]{inputenc}")
    #     file.write("\\begin{document}")
    #     file.write("The formula for dataset is:")
    #     file.write("\\begin{equation}")
    #     file.write(formula)
    #     file.write("\\end{equation}")
    #     file.write("\\end{document}")
    # print(path)
    # # pdfl.set_output_directory("../static/uploads")
    # try:
    #     res = subprocess.check_output(['pdflatex', r"C:\diploma\chemistry_platform\qsar\test.tex"], shell=True)
    # except Exception as e:
    #     print(e)
    # print(res)
    # pdf, log, completed_process = pdfl.create_pdf()
    # with open(f"../static/uploads/{output_filename}.pdf", "wb"):
    #     file.write(pdf)
    return formula


if __name__ == "__main__":
    # main('Admission_Predict.csv', "Chance of Admit ", 10, 4, 1, 1)
    run("test", 'Admission_Predict.csv', "Chance of Admit ", 10, 4, 1, 1)
