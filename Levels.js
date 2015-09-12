/**
 * Created by ehtd on 9/11/15.
 */

var level;

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

var scanLines = 11;

var $1 = {};
$1.world = [[W1,WH,WH,WH,WH,WH,DD,WH,WH,WH,WH,WH,W2],//0
            [WV,o_,ee,r_,ee,ee,PV,ee,ee,ee,ee,o_,WV],//1
            [WV,ee,ee,r_,ee,ee,PV,ee,ee,ee,bb,ee,WV],//2
            [WV,r_,r_,r_,ee,ee,PV,ee,ee,ee,bb,ee,WV],//3
            [WV,ee,ee,ee,ee,ee,PV,ee,ee,ee,bb,ee,WV],//4
            [WV,ee,PU,ee,ee,ee,PD,ee,ee,ee,bb,ee,WV],//5
            [WV,PL,PH,PR,ee,ee,ee,ee,ee,ee,bb,ee,WV],//6
            [WV,ee,PD,ee,ee,ee,ee,c_,T1,T1,T1,ee,WV],//7
            [WV,ee,ee,ee,P1,P2,ee,ee,T2,T2,T2,ee,WV],//8
            [WV,ee,ee,ee,P3,P4,ee,ee,ee,ee,ee,ee,WV],//9
            [WV,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,WV],//1
            [WV,ee,ee,ee,ee,o_,ee,ee,ee,ee,ee,ee,WV],//11
            [W4,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,WH,W3]//12
            ];
