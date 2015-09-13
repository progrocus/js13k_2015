/**
 * Created by ehtd on 9/11/15.
 */

var currentLevel = 0;
var scale = 2;
var tileSize = 16 * scale;
// Sprite keys

// Walls
var WH = 16;// Horizontal wall
var WV = 17;// Vertical wall
var W1 = 12;// Top left corner wall
var W2 = 13;// Top right corner wall
var W3 = 15;// Bottom right corner wall
var W4 = 14;// Bottom left corner wall
var T1 = 18;// Green tree
var T2 = 19;// Red tree
var bb = 20;// Water

// Paths
var PH = 5;// horizontal
var PV = 4;// vertical
var P1 = 0;// top left
var P2 = 1;// top right
var P3 = 2;// bottom right
var P4 = 3;// bottom left
var PU = 8;// point up
var PD = 9;// down
var PR = 7;// right
var PL = 6;// left
var ee = 10;// Grass

// objects
var DD = 21;// door
var o_ = 22;// egg
var r_ = 23;// rock
var c_ = 24;// chest
var kd = 32;//knight facing down
var ku = 34; //knight facing up
var swordUp = 36;
var swordDown = 37;

var scanLines = 11;
var darkTile = 27;

// Reference level
var $10 = {};
$10.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,ee,ee,r_,ee,kd,PV,ee,ee,ee,ee,o_,WV],//1
            [WV,ee,ee,r_,ee,ee,PV,ee,ee,ee,bb,ee,WV],//2
            [WV,r_,r_,r_,ee,ee,PV,r_,ee,ee,bb,ee,WV],//3
            [WV,ee,ee,ee,ee,ee,PV,ee,ee,ee,bb,ee,WV],//4
            [WV,ee,PU,ee,ee,ee,PD,ee,ee,ee,bb,ee,WV],//5
            [WV,PL,PH,PR,ee,ee,ee,ee,ee,ee,bb,ee,WV],//6
            [WV,ee,PD,ee,ee,T1,ku,c_,T1,T1,T1,ee,WV],//7
            [WV,ee,ee,ee,P1,P2,ee,ee,T2,T2,T2,ee,WV],//8
            [WV,ee,ee,ee,P3,P4,ee,ee,ee,ee,ee,ee,WV],//9
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//1
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
            ];
$10.x = 1*tileSize;
$10.y = 5*tileSize;

var $0 = {};
$0.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//1
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//2
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//3
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//4
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//5
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//6
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//7
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//8
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//9
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//1
    [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//11
    [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
];
$0.x = 1*tileSize;
$0.y = 5*tileSize;

// Levels
var $1 = {};
$1.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,o_,PH,PH,P2,T1,PV,T2,bb,bb,bb,o_,WV],//1
            [WV,bb,bb,bb,PV,T1,PV,T2,bb,bb,bb,PU,WV],//2
            [WV,bb,bb,bb,PV,T1,PV,T2,bb,bb,bb,PV,WV],//3
            [WV,bb,bb,bb,PV,T1,PV,T2,bb,bb,bb,PV,WV],//4
            [WV,bb,bb,bb,PV,T1,PV,T2,bb,bb,bb,PV,WV],//5
            [WV,bb,bb,T2,P3,PH,P4,ee,ee,ee,ee,PV,WV],//6
            [WV,bb,bb,T2,ee,ee,ee,PL,PH,PH,PH,P4,WV],//7
            [WV,bb,bb,T2,ee,ee,PU,PL,PH,PH,PH,P2,WV],//8
            [WV,bb,bb,bb,ee,ee,PV,ee,ee,ee,ee,PV,WV],//9
            [WV,bb,bb,bb,ee,ee,PV,ee,ee,ee,ee,PD,WV],//1
            [WV,c_,PH,PH,PH,PH,P4,ee,ee,ee,ee,o_,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
];
$1.x = 6*tileSize;
$1.y = 7*tileSize;

var $2 = {};
$2.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,T1,T2,T1,bb,bb,PV,ee,ee,ee,r_,T2,WV],//1
            [WV,ee,ee,ee,PU,bb,PV,ee,ee,ee,T1,T1,WV],//2
            [WV,ee,T2,ee,PD,bb,P3,PH,PH,P2,T1,T1,WV],//3
            [WV,ee,bb,ee,bb,bb,bb,bb,ee,PD,T1,T1,WV],//4
            [WV,ee,bb,ee,bb,bb,bb,bb,ee,ee,PU,T1,WV],//5
            [WV,ee,bb,ee,PL,PH,PH,PH,PR,ee,PV,T2,WV],//6
            [WV,ee,bb,ee,T2,T2,T2,T2,ee,T1,PD,T1,WV],//7
            [WV,o_,bb,r_,bb,bb,bb,bb,PU,T1,r_,c_,WV],//8
            [WV,bb,bb,r_,bb,bb,bb,bb,PV,T1,ee,T1,WV],//9
            [WV,bb,bb,PU,bb,bb,bb,bb,PD,T1,T2,T1,WV],//1
            [WV,o_,ee,PD,ee,ee,ee,ee,ee,ee,ee,o_,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
];
$2.x = 1*tileSize;
$2.y = 5*tileSize;

var $3 = {};
$3.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,c_,ee,ee,ee,ee,PV,ee,ee,ee,kd,T1,WV],//1
            [WV,ee,ee,T2,T2,ee,PD,ee,ee,ee,ee,T1,WV],//2
            [WV,ee,ee,T1,bb,T1,T1,ee,ee,ee,ee,T1,WV],//3
            [WV,ee,ee,ee,bb,bb,bb,ee,ee,ee,ee,T1,WV],//4
            [WV,o_,ee,ee,bb,r_,bb,ee,ee,ee,ee,o_,WV],//5
            [WV,ee,ee,ee,bb,r_,bb,ee,ee,ee,T1,T1,WV],//6
            [WV,ee,ee,ee,bb,r_,bb,ee,ee,ee,T1,T1,WV],//7
            [WV,ee,ee,ee,bb,bb,bb,ee,ee,ee,T1,T1,WV],//8
            [WV,ee,ee,ee,T1,T2,T2,ee,ee,ee,T1,T1,WV],//9
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,T1,T1,WV],//1
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ku,T1,T2,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
];
$3.x = 2*tileSize;
$3.y = 5*tileSize;

var $4 = {};
$4.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,o_,ee,ee,ee,ee,PD,T2,T2,T2,bb,o_,WV],//1
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//2
            [WV,bb,bb,bb,bb,bb,ee,ee,ee,ee,ee,ee,WV],//3
            [WV,T2,T2,T2,bb,bb,bb,bb,bb,ee,ee,ee,WV],//4
            [WV,ee,ee,ee,ee,bb,kd,bb,o_,ee,ee,T2,WV],//5
            [WV,c_,ee,ee,ee,bb,ee,bb,ee,ee,ee,ee,WV],//6
            [WV,PU,ee,ee,ee,bb,ee,bb,ee,ee,ee,ee,WV],//7
            [WV,PV,ee,ee,ee,bb,ee,r_,ee,ee,ee,ee,WV],//8
            [WV,PV,ee,ee,ee,bb,bb,bb,ee,ee,ee,ee,WV],//9
            [WV,PV,ee,ee,ee,P1,PH,P2,ee,ee,ee,ku,WV],//1
            [WV,P3,PH,PH,PH,P4,T2,P3,PH,PH,PR,o_,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
];
$4.x = 1*tileSize;
$4.y = 5*tileSize;

var levels = [$4];