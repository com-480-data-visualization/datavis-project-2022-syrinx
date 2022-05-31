# Generated from MyGrammer.g4 by ANTLR 4.9.2
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
    from typing import TextIO
else:
    from typing.io import TextIO



def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\13")
        buf.write("b\b\1\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7")
        buf.write("\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t\13\3\2\3\2\3\2\3\3\3\3")
        buf.write("\3\3\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\6\6\6(\n\6")
        buf.write("\r\6\16\6)\3\7\3\7\3\7\3\7\3\7\3\7\3\7\3\7\5\7\64\n\7")
        buf.write("\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\5\bB")
        buf.write("\n\b\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3")
        buf.write("\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\5\tX\n\t\3\n\6\n[\n\n\r")
        buf.write("\n\16\n\\\3\n\3\n\3\13\3\13\2\2\f\3\3\5\4\7\5\t\6\13\7")
        buf.write("\r\b\17\t\21\n\23\13\25\2\3\2\4\4\2\13\13\"\"\3\2\62;")
        buf.write("\2i\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2")
        buf.write("\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23")
        buf.write("\3\2\2\2\3\27\3\2\2\2\5\32\3\2\2\2\7\35\3\2\2\2\t!\3\2")
        buf.write("\2\2\13\'\3\2\2\2\r\63\3\2\2\2\17A\3\2\2\2\21W\3\2\2\2")
        buf.write("\23Z\3\2\2\2\25`\3\2\2\2\27\30\7)\2\2\30\31\7u\2\2\31")
        buf.write("\4\3\2\2\2\32\33\7v\2\2\33\34\7q\2\2\34\6\3\2\2\2\35\36")
        buf.write("\7o\2\2\36\37\7q\2\2\37 \7u\2\2 \b\3\2\2\2!\"\7f\2\2\"")
        buf.write("#\7c\2\2#$\7{\2\2$%\7u\2\2%\n\3\2\2\2&(\5\25\13\2\'&\3")
        buf.write("\2\2\2()\3\2\2\2)\'\3\2\2\2)*\3\2\2\2*\f\3\2\2\2+,\7y")
        buf.write("\2\2,-\7g\2\2-.\7g\2\2./\7m\2\2/\64\7u\2\2\60\61\7y\2")
        buf.write("\2\61\62\7m\2\2\62\64\7u\2\2\63+\3\2\2\2\63\60\3\2\2\2")
        buf.write("\64\16\3\2\2\2\65\66\7G\2\2\66\67\7n\2\2\678\7f\2\289")
        buf.write("\7g\2\29B\7t\2\2:;\7G\2\2;<\7n\2\2<=\7f\2\2=>\7g\2\2>")
        buf.write("?\7t\2\2?@\7n\2\2@B\7{\2\2A\65\3\2\2\2A:\3\2\2\2B\20\3")
        buf.write("\2\2\2CD\7W\2\2DE\7p\2\2EF\7m\2\2FG\7p\2\2GH\7q\2\2HI")
        buf.write("\7y\2\2IX\7p\2\2JK\7P\2\2KL\7c\2\2LX\7P\2\2MN\7p\2\2N")
        buf.write("O\7c\2\2OX\7p\2\2PQ\7P\2\2QR\7c\2\2RX\7p\2\2ST\7P\2\2")
        buf.write("TU\7C\2\2UX\7P\2\2VX\7\2\2\3WC\3\2\2\2WJ\3\2\2\2WM\3\2")
        buf.write("\2\2WP\3\2\2\2WS\3\2\2\2WV\3\2\2\2X\22\3\2\2\2Y[\t\2\2")
        buf.write("\2ZY\3\2\2\2[\\\3\2\2\2\\Z\3\2\2\2\\]\3\2\2\2]^\3\2\2")
        buf.write("\2^_\b\n\2\2_\24\3\2\2\2`a\t\3\2\2a\26\3\2\2\2\b\2)\63")
        buf.write("AW\\\3\b\2\2")
        return buf.getvalue()


class MyGrammerLexer(Lexer):

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    T__0 = 1
    T__1 = 2
    T__2 = 3
    T__3 = 4
    INT = 5
    WKS = 6
    ELDER = 7
    NAN = 8
    WS = 9

    channelNames = [ u"DEFAULT_TOKEN_CHANNEL", u"HIDDEN" ]

    modeNames = [ "DEFAULT_MODE" ]

    literalNames = [ "<INVALID>",
            "''s'", "'to'", "'mos'", "'days'" ]

    symbolicNames = [ "<INVALID>",
            "INT", "WKS", "ELDER", "NAN", "WS" ]

    ruleNames = [ "T__0", "T__1", "T__2", "T__3", "INT", "WKS", "ELDER", 
                  "NAN", "WS", "DIGIT" ]

    grammarFileName = "MyGrammer.g4"

    def __init__(self, input=None, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = LexerATNSimulator(self, self.atn, self.decisionsToDFA, PredictionContextCache())
        self._actions = None
        self._predicates = None


