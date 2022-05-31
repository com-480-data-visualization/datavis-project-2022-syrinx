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


    # Visit a parse tree produced by MyGrammerParser#DaysExpr.
    def visitDaysExpr(self, ctx:MyGrammerParser.DaysExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#WeekExpr.
    def visitWeekExpr(self, ctx:MyGrammerParser.WeekExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#TensExpr.
    def visitTensExpr(self, ctx:MyGrammerParser.TensExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#MosExpr.
    def visitMosExpr(self, ctx:MyGrammerParser.MosExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#FixedAgeExpr.
    def visitFixedAgeExpr(self, ctx:MyGrammerParser.FixedAgeExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#NanExpr.
    def visitNanExpr(self, ctx:MyGrammerParser.NanExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#ElderExpr.
    def visitElderExpr(self, ctx:MyGrammerParser.ElderExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by MyGrammerParser#SpanExpr.
    def visitSpanExpr(self, ctx:MyGrammerParser.SpanExprContext):
        return self.visitChildren(ctx)



del MyGrammerParser