# Generated from MyGrammer.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .MyGrammerParser import MyGrammerParser
else:
    from MyGrammerParser import MyGrammerParser

# This class defines a complete listener for a parse tree produced by MyGrammerParser.
class MyGrammerListener(ParseTreeListener):

    # Enter a parse tree produced by MyGrammerParser#topexpr.
    def enterTopexpr(self, ctx:MyGrammerParser.TopexprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#topexpr.
    def exitTopexpr(self, ctx:MyGrammerParser.TopexprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#DeadExpr.
    def enterDeadExpr(self, ctx:MyGrammerParser.DeadExprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#DeadExpr.
    def exitDeadExpr(self, ctx:MyGrammerParser.DeadExprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#PoliceExpr.
    def enterPoliceExpr(self, ctx:MyGrammerParser.PoliceExprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#PoliceExpr.
    def exitPoliceExpr(self, ctx:MyGrammerParser.PoliceExprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#SuicideExpr.
    def enterSuicideExpr(self, ctx:MyGrammerParser.SuicideExprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#SuicideExpr.
    def exitSuicideExpr(self, ctx:MyGrammerParser.SuicideExprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#AliveExpr.
    def enterAliveExpr(self, ctx:MyGrammerParser.AliveExprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#AliveExpr.
    def exitAliveExpr(self, ctx:MyGrammerParser.AliveExprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#NanExpr.
    def enterNanExpr(self, ctx:MyGrammerParser.NanExprContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#NanExpr.
    def exitNanExpr(self, ctx:MyGrammerParser.NanExprContext):
        pass


    # Enter a parse tree produced by MyGrammerParser#nan.
    def enterNan(self, ctx:MyGrammerParser.NanContext):
        pass

    # Exit a parse tree produced by MyGrammerParser#nan.
    def exitNan(self, ctx:MyGrammerParser.NanContext):
        pass



del MyGrammerParser