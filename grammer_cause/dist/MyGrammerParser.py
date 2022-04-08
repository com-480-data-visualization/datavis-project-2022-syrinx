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
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\n")
        buf.write("\25\4\2\t\2\4\3\t\3\4\4\t\4\3\2\3\2\3\2\3\3\3\3\3\3\3")
        buf.write("\3\3\3\5\3\21\n\3\3\4\3\4\3\4\2\2\5\2\4\6\2\3\3\3\3\6")
        buf.write("\2\25\2\b\3\2\2\2\4\20\3\2\2\2\6\22\3\2\2\2\b\t\5\4\3")
        buf.write("\2\t\n\7\2\2\3\n\3\3\2\2\2\13\21\7\7\2\2\f\21\7\b\2\2")
        buf.write("\r\21\7\t\2\2\16\21\7\n\2\2\17\21\5\6\4\2\20\13\3\2\2")
        buf.write("\2\20\f\3\2\2\2\20\r\3\2\2\2\20\16\3\2\2\2\20\17\3\2\2")
        buf.write("\2\21\5\3\2\2\2\22\23\t\2\2\2\23\7\3\2\2\2\3\20")
        return buf.getvalue()


class MyGrammerParser ( Parser ):

    grammarFileName = "MyGrammer.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'none'", "'nan'", "'NaN'", "'NAN'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "DEAD", "POLICE", "SUICIDE", "ALIVE" ]

    RULE_topexpr = 0
    RULE_expr = 1
    RULE_nan = 2

    ruleNames =  [ "topexpr", "expr", "nan" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    DEAD=5
    POLICE=6
    SUICIDE=7
    ALIVE=8

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
            self.state = 6
            self.expr()
            self.state = 7
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



    class DeadExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def DEAD(self):
            return self.getToken(MyGrammerParser.DEAD, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterDeadExpr" ):
                listener.enterDeadExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitDeadExpr" ):
                listener.exitDeadExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitDeadExpr" ):
                return visitor.visitDeadExpr(self)
            else:
                return visitor.visitChildren(self)


    class AliveExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ALIVE(self):
            return self.getToken(MyGrammerParser.ALIVE, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterAliveExpr" ):
                listener.enterAliveExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitAliveExpr" ):
                listener.exitAliveExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitAliveExpr" ):
                return visitor.visitAliveExpr(self)
            else:
                return visitor.visitChildren(self)


    class NanExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def nan(self):
            return self.getTypedRuleContext(MyGrammerParser.NanContext,0)


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


    class SuicideExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def SUICIDE(self):
            return self.getToken(MyGrammerParser.SUICIDE, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterSuicideExpr" ):
                listener.enterSuicideExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitSuicideExpr" ):
                listener.exitSuicideExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitSuicideExpr" ):
                return visitor.visitSuicideExpr(self)
            else:
                return visitor.visitChildren(self)


    class PoliceExprContext(ExprContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a MyGrammerParser.ExprContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def POLICE(self):
            return self.getToken(MyGrammerParser.POLICE, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterPoliceExpr" ):
                listener.enterPoliceExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitPoliceExpr" ):
                listener.exitPoliceExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitPoliceExpr" ):
                return visitor.visitPoliceExpr(self)
            else:
                return visitor.visitChildren(self)



    def expr(self):

        localctx = MyGrammerParser.ExprContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_expr)
        try:
            self.state = 14
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [MyGrammerParser.DEAD]:
                localctx = MyGrammerParser.DeadExprContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 9
                self.match(MyGrammerParser.DEAD)
                pass
            elif token in [MyGrammerParser.POLICE]:
                localctx = MyGrammerParser.PoliceExprContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 10
                self.match(MyGrammerParser.POLICE)
                pass
            elif token in [MyGrammerParser.SUICIDE]:
                localctx = MyGrammerParser.SuicideExprContext(self, localctx)
                self.enterOuterAlt(localctx, 3)
                self.state = 11
                self.match(MyGrammerParser.SUICIDE)
                pass
            elif token in [MyGrammerParser.ALIVE]:
                localctx = MyGrammerParser.AliveExprContext(self, localctx)
                self.enterOuterAlt(localctx, 4)
                self.state = 12
                self.match(MyGrammerParser.ALIVE)
                pass
            elif token in [MyGrammerParser.EOF, MyGrammerParser.T__0, MyGrammerParser.T__1, MyGrammerParser.T__2, MyGrammerParser.T__3]:
                localctx = MyGrammerParser.NanExprContext(self, localctx)
                self.enterOuterAlt(localctx, 5)
                self.state = 13
                self.nan()
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class NanContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EOF(self):
            return self.getToken(MyGrammerParser.EOF, 0)

        def getRuleIndex(self):
            return MyGrammerParser.RULE_nan

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterNan" ):
                listener.enterNan(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitNan" ):
                listener.exitNan(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNan" ):
                return visitor.visitNan(self)
            else:
                return visitor.visitChildren(self)




    def nan(self):

        localctx = MyGrammerParser.NanContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_nan)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 16
            _la = self._input.LA(1)
            if not(((((_la - -1)) & ~0x3f) == 0 and ((1 << (_la - -1)) & ((1 << (MyGrammerParser.EOF - -1)) | (1 << (MyGrammerParser.T__0 - -1)) | (1 << (MyGrammerParser.T__1 - -1)) | (1 << (MyGrammerParser.T__2 - -1)) | (1 << (MyGrammerParser.T__3 - -1)))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





