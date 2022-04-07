grammar MyGrammer;

topexpr: expr EOF;

expr: DEAD # DeadExpr
	| POLICE # PoliceExpr
	| SUICIDE # SuicideExpr
	| ALIVE # AliveExpr
	| nan # NanExpr
	;

nan: 'none' | 'nan' | 'NaN' | 'NAN' | EOF;

DEAD: 'TRUE' | 'DECEASED (see notes)' | 'KILLED BY 3RD PARTY' | 'DIED WHILE CASE PENDING';
POLICE: 'KILLED BY POLICE' | 'DIED IN POLICE CUSTODY';
SUICIDE: 'COMMITTED SUICIDE IN JAIL / PRISON' | 'FAMILICIDE-SUICIDE';
ALIVE: 'FALSE' | 'ATTEMPTED';
