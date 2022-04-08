# Generated from MyGrammer.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .MyGrammerParser import MyGrammerParser
else:
    from MyGrammerParser import MyGrammerParser

# This class defines a complete generic visitor for a parse tree produced by MyGrammerParser.

class MyGrammerVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by MyGrammerParser#topexpr.
    def visitTopexpr(self, ctx:MyGrammerParser.TopexprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#DeadExpr.
    def visitDeadExpr(self, ctx:MyGrammerParser.DeadExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#PoliceExpr.
    def visitPoliceExpr(self, ctx:MyGrammerParser.PoliceExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#SuicideExpr.
    def visitSuicideExpr(self, ctx:MyGrammerParser.SuicideExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#AliveExpr.
    def visitAliveExpr(self, ctx:MyGrammerParser.AliveExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#NanExpr.
    def visitNanExpr(self, ctx:MyGrammerParser.NanExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#nan.
    def visitNan(self, ctx:MyGrammerParser.NanContext):
        return self.visitChildren(ctx)



del MyGrammerParser