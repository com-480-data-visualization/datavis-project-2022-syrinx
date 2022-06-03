import sys
from antlr4 import *
from dist.MyGrammerLexer import MyGrammerLexer
from dist.MyGrammerParser import MyGrammerParser
from dist.MyGrammerVisitor import MyGrammerVisitor
import numpy as np


class MyVisitor(MyGrammerVisitor):
    def visitDeadExpr(self, _):
        return "dead"
    def visitPoliceExpr(self, _):
        return "killed by police"
    def visitSuicideExpr(self, _):
        return "suicided"
    def visitAliveExpr(self, _):
        return "alive"
    def visitNanExpr(self, _):
        return "NaN"

def parse_data(age: str) -> str:
    data =  InputStream(age)
    # lexer
    lexer = MyGrammerLexer(data)
    stream = CommonTokenStream(lexer)
    # parser
    parser = MyGrammerParser(stream)
    tree = parser.expr()
    # evaluator
    visitor = MyVisitor()
    output = visitor.visit(tree)
    if type(output) is str:
        return output
    else:
        raise ValueError("Problem to produce a str while parsing cause: ", type(output))

if __name__ == "__main__":
    while 1:
        data =  InputStream(input(">>> "))
        # lexer
        lexer = MyGrammerLexer(data)
        stream = CommonTokenStream(lexer)
        # parser
        parser = MyGrammerParser(stream)
        tree = parser.expr()
        # evaluator
        visitor = MyVisitor()
        output = visitor.visit(tree)
        print(output)
