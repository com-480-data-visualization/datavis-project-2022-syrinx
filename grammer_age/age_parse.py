import sys
from antlr4 import *
from dist.MyGrammerLexer import MyGrammerLexer
from dist.MyGrammerParser import MyGrammerParser
from dist.MyGrammerVisitor import MyGrammerVisitor
import numpy as np


class MyVisitor(MyGrammerVisitor):
    def visitFixedAgeExpr(self, ctx) -> np.float64:
        return np.float64(ctx.atom.text) * 365.
    def visitTensExpr(self, ctx) -> np.float64:
        return (5. + np.float64(ctx.atom.text)) * 365.

    def visitSpanExpr(self, ctx) -> np.float64:
        l = self.visit(ctx.left)
        r = self.visit(ctx.right)

        return .5 * (l + r)

    def visitElderExpr(self, _) -> np.float64:
        return np.float64(80.) * 365.

    def visitMosExpr(self, ctx) -> np.float64:
        return 31. * np.float64(ctx.atom.text)

    def visitDaysExpr(self, ctx) -> np.float64:
        return np.float64(ctx.atom.text)

    def visitWeekExpr(self, ctx) -> np.float64:
        return 7. * np.float64(ctx.atom.text)

    def visitNanExpr(self, _) -> np.float64:
        return np.float64(np.nan)

def parse_data(age: str) -> np.float64:
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
    if type(output) is np.float64:
        return output
    else:
        raise ValueError("Problem to produce a float while parsing age: ", type(output))

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
