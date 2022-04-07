# Generated from MyGrammer.g4 by ANTLR 4.9.2
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO


def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\13")
        buf.write(" \4\2\t\2\4\3\t\3\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3")
        buf.write("\3\3\3\3\3\3\3\3\3\3\3\3\5\3\26\n\3\3\3\3\3\3\3\7\3\33")
        buf.write("\n\3\f\3\16\3\36\13\3\3\3\2\3\4\4\2\4\2\2\2$\2\6\3\2\2")
        buf.write("\2\4\25\3\2\2\2\6\7\5\4\3\2\7\b\7\2\2\3\b\3\3\2\2\2\t")
        buf.write("\n\b\3\1\2\n\26\7\7\2\2\13\f\7\7\2\2\f\26\7\3\2\2\r\26")
        buf.write("\7\t\2\2\16\17\7\7\2\2\17\26\7\5\2\2\20\21\7\7\2\2\21")
        buf.write("\26\7\6\2\2\22\23\7\7\2\2\23\26\7\b\2\2\24\26\7\n\2\2")
        buf.write("\25\t\3\2\2\2\25\13\3\2\2\2\25\r\3\2\2\2\25\16\3\2\2\2")
        buf.write("\25\20\3\2\2\2\25\22\3\2\2\2\25\24\3\2\2\2\26\34\3\2\2")
        buf.write("\2\27\30\f\b\2\2\30\31\7\4\2\2\31\33\5\4\3\t\32\27\3\2")
        buf.write("\2\2\33\36\3\2\2\2\34\32\3\2\2\2\34\35\3\2\2\2\35\5\3")
        buf.write("\2\2\2\36\34\3\2\2\2\4\25\34")
        return buf.getvalue()


class MyGrammerParser ( Parser ):

    grammarFileName = "MyGrammer.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "''s'", "'to'", "'mos'", "'days'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "INT", "WKS", "ELDER", "NAN", "WS" ]

    RULE_topexpr = 0
    RULE_expr = 1

    ruleNames =  [ "topexpr", "expr" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    INT=5
    WKS=6
    ELDER=7
    NAN=8
    WS=9

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class TopexprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def expr(self):
            return self.getTypedRuleContext(MyGrammerParser.ExprContext,0)


        def EOF(self):
            return self.getToken(MyGrammerParser.EOF, 0)

        def getRuleIndex(self):
            return MyGrammerParser.RULE_topexpr

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTopexpr" ):
                listener.enterTopexpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTopexpr" ):
                listener.exitTopexpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTopexpr" ):
                return visitor.visitTopexpr(self)
            else:
                return visitor.visitChildren(self)




    def topexpr(self):

        localctx = MyGrammerParser.TopexprContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_topexpr)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 4
            self.expr(0)
            self.state = 5
            self.match(MyGrammerParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return MyGrammerParser.RULE_expr

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)


    class DaysExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def INT(self):
            return self.getToken(MyGrammerParser.INT, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterDaysExpr" ):
                listener.enterDaysExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitDaysExpr" ):
                listener.exitDaysExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitDaysExpr" ):
                return visitor.visitDaysExpr(self)
            else:
                return visitor.visitChildren(self)


    class WeekExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def WKS(self):
            return self.getToken(MyGrammerParser.WKS, 0)
        def INT(self):
            return self.getToken(MyGrammerParser.INT, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterWeekExpr" ):
                listener.enterWeekExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitWeekExpr" ):
                listener.exitWeekExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitWeekExpr" ):
                return visitor.visitWeekExpr(self)
            else:
                return visitor.visitChildren(self)


    class TensExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def INT(self):
            return self.getToken(MyGrammerParser.INT, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTensExpr" ):
                listener.enterTensExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTensExpr" ):
                listener.exitTensExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTensExpr" ):
                return visitor.visitTensExpr(self)
            else:
                return visitor.visitChildren(self)


    class MosExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def INT(self):
            return self.getToken(MyGrammerParser.INT, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterMosExpr" ):
                listener.enterMosExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitMosExpr" ):
                listener.exitMosExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitMosExpr" ):
                return visitor.visitMosExpr(self)
            else:
                return visitor.visitChildren(self)


    class FixedAgeExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def INT(self):
            return self.getToken(MyGrammerParser.INT, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterFixedAgeExpr" ):
                listener.enterFixedAgeExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitFixedAgeExpr" ):
                listener.exitFixedAgeExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitFixedAgeExpr" ):
                return visitor.visitFixedAgeExpr(self)
            else:
                return visitor.visitChildren(self)


    class NanExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def NAN(self):
            return self.getToken(MyGrammerParser.NAN, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterNanExpr" ):
                listener.enterNanExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitNanExpr" ):
                listener.exitNanExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNanExpr" ):
                return visitor.visitNanExpr(self)
            else:
                return visitor.visitChildren(self)


    class ElderExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.atom = None # Token
            self.copyFrom(ctx)

        def ELDER(self):
            return self.getToken(MyGrammerParser.ELDER, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterElderExpr" ):
                listener.enterElderExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitElderExpr" ):
                listener.exitElderExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitElderExpr" ):
                return visitor.visitElderExpr(self)
            else:
                return visitor.visitChildren(self)


    class SpanExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.left = None # ExprContext
            self.right = None # ExprContext
            self.copyFrom(ctx)

        def expr(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(MyGrammerParser.ExprContext)
            else:
                return self.getTypedRuleContext(MyGrammerParser.ExprContext,i)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterSpanExpr" ):
                listener.enterSpanExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitSpanExpr" ):
                listener.exitSpanExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitSpanExpr" ):
                return visitor.visitSpanExpr(self)
            else:
                return visitor.visitChildren(self)



    def expr(self, _p:int=0):
        _parentctx = self._ctx
        _parentState = self.state
        localctx = MyGrammerParser.ExprContext(self, self._ctx, _parentState)
        _prevctx = localctx
        _startState = 2
        self.enterRecursionRule(localctx, 2, self.RULE_expr, _p)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 19
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,0,self._ctx)
            if la_ == 1:
                localctx = MyGrammerParser.FixedAgeExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx

                self.state = 8
                localctx.atom = self.match(MyGrammerParser.INT)
                pass

            elif la_ == 2:
                localctx = MyGrammerParser.TensExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 9
                localctx.atom = self.match(MyGrammerParser.INT)
                self.state = 10
                self.match(MyGrammerParser.T__0)
                pass

            elif la_ == 3:
                localctx = MyGrammerParser.ElderExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 11
                localctx.atom = self.match(MyGrammerParser.ELDER)
                pass

            elif la_ == 4:
                localctx = MyGrammerParser.MosExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 12
                localctx.atom = self.match(MyGrammerParser.INT)
                self.state = 13
                self.match(MyGrammerParser.T__2)
                pass

            elif la_ == 5:
                localctx = MyGrammerParser.DaysExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 14
                localctx.atom = self.match(MyGrammerParser.INT)
                self.state = 15
                self.match(MyGrammerParser.T__3)
                pass

            elif la_ == 6:
                localctx = MyGrammerParser.WeekExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 16
                localctx.atom = self.match(MyGrammerParser.INT)
                self.state = 17
                self.match(MyGrammerParser.WKS)
                pass

            elif la_ == 7:
                localctx = MyGrammerParser.NanExprContext(self, localctx)
                self._ctx = localctx
                _prevctx = localctx
                self.state = 18
                self.match(MyGrammerParser.NAN)
                pass


            self._ctx.stop = self._input.LT(-1)
            self.state = 26
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,1,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    if self._parseListeners is not None:
                        self.triggerExitRuleEvent()
                    _prevctx = localctx
                    localctx = MyGrammerParser.SpanExprContext(self, MyGrammerParser.ExprContext(self, _parentctx, _parentState))
                    localctx.left = _prevctx
                    self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                    self.state = 21
                    if not self.precpred(self._ctx, 6):
                        from antlr4.error.Errors import FailedPredicateException
                        raise FailedPredicateException(self, "self.precpred(self._ctx, 6)")
                    self.state = 22
                    self.match(MyGrammerParser.T__1)
                    self.state = 23
                    localctx.right = self.expr(7) 
                self.state = 28
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,1,self._ctx)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.unrollRecursionContexts(_parentctx)
        return localctx



    def sempred(self, localctx:RuleContext, ruleIndex:int, predIndex:int):
        if self._predicates == None:
            self._predicates = dict()
        self._predicates[1] = self.expr_sempred
        pred = self._predicates.get(ruleIndex, None)
        if pred is None:
            raise Exception("No predicate with index:" + str(ruleIndex))
        else:
            return pred(localctx, predIndex)

    def expr_sempred(self, localctx:ExprContext, predIndex:int):
            if predIndex == 0:
                return self.precpred(self._ctx, 6)
         




