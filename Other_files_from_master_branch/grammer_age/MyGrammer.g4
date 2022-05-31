grammar MyGrammer;

topexpr: expr EOF;

expr: atom=INT # FixedAgeExpr
	| atom=INT'\'s' # TensExpr
	| left=expr 'to' right=expr # SpanExpr
	| atom=ELDER # ElderExpr
	| atom=INT 'mos' # MosExpr
	| atom=INT 'days' # DaysExpr
	| atom=INT WKS # WeekExpr
	| NAN # NanExpr
	;

INT : DIGIT+;
WKS : 'weeks' | 'wks';
ELDER : 'Elder' | 'Elderly';
NAN : 'Unknown' | 'NaN' | 'nan' | 'Nan' | 'NAN' | EOF;
WS : [ \t]+ -> skip;
fragment DIGIT : [0-9];
