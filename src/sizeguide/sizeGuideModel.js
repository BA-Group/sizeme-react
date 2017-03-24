import i18n from "../api/i18n";

const arrowColorGreen = "#42AE49";
const arrowColorBlack = "#000000";

export default function loadArrows (isSizeGuide, itemType) {
    // arrows first
    let arrowColor = arrowColorGreen;
    let arcStyle = "arc";

    if (isSizeGuide) {
        arrowColor = arrowColorBlack;
        arcStyle = "line"; // size guide shows flat measurements (except neck opening)
    }

    const itemTypeArr = Array.from(itemType)
        .filter(a => a !== ".")
        .map(a => parseInt(a, 10));

    const measurementArrows = {};
    const itemDrawing = {};
    const fitOrder = [
        "chest",
        "waist",
        "underbust",
        "pant_waist",
        "hips",
        "inseam",
        "outseam",
        "thigh_width",
        "knee_width",
        "calf_width",
        "pant_sleeve_width",
        "neck_opening_width",
        "shoulder_width",
        "sleeve_top_width",
        "sleeve_top_opening",
        "sleeve",
        "wrist_width",
        "front_height",
        "shoe_inside_length",
        "shoe_inside_width",
        "hat_width",
        "hood_height"
    ];


    measurementArrows.chest = {
        mirror: false,
        coords: [{ X: -250, Y: 399 }, { X: 250, Y: 399 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };
    measurementArrows.waist = {
        mirror: false,
        coords: [{ X: -250, Y: 635 }, { X: 250, Y: 635 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };
    measurementArrows.front_height = {
        mirror: false,
        coords: [{ X: -174, Y: 0 }, { X: -174, Y: 978 }],
        style: "line",
        lift: false,
        color: arrowColor
    };
    measurementArrows.neck_opening_width = {
        mirror: false,
        coords: [{ X: 0, Y: 47 }, { X: 174, Y: 0, cp1X: 65, cp1Y: 45, cp2X: 140, cp2Y: 23 }, {
            X: 0,
            Y: 100,
            cp1X: 150,
            cp1Y: 46,
            cp2X: 50,
            cp2Y: 92
        },
            { X: -174, Y: 0, cp1X: -50, cp1Y: 92, cp2X: -150, cp2Y: 46 }, {
                X: 0,
                Y: 47,
                cp1X: -140,
                cp1Y: 23,
                cp2X: -65,
                cp2Y: 45
            }],
        style: "line",
        lift: true,
        color: arrowColor
    };

    measurementArrows.hood_height = {
        mirror: false,
        coords: [{ X: 195, Y: -5 }, { X: 195, Y: -390 }],
        style: "line",
        lift: false,
        color: arrowColor
    };
    measurementArrows.shoulder_width = {
        mirror: false,
        coords: [{ X: -329, Y: 42 }, { X: -164, Y: -7 }],
        style: "line",
        lift: true,
        color: arrowColor
    };

    measurementArrows.pant_waist = {
        mirror: false,
        coords: [{ X: -232, Y: 0 }, { X: 222, Y: 0 }],
        style: arcStyle,
        lift: true,
        color: arrowColor
    };
    measurementArrows.hips = {
        mirror: false,
        coords: [{ X: -261, Y: 171 }, { X: 263, Y: 171 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };
    measurementArrows.outseam = {
        mirror: false,
        coords: [{ X: 222, Y: 0 }, { X: 263, Y: 171 }, { X: 302, Y: 1071 }],
        style: "line",
        lift: true,
        color: arrowColor
    };
    measurementArrows.inseam = {
        mirror: false,
        coords: [{ X: 5, Y: 297 }, { X: 151, Y: 1084 }],
        style: "line",
        lift: false,
        color: arrowColor
    };
    measurementArrows.thigh_width = {
        mirror: false,
        coords: [{ X: -266, Y: 274 }, { X: -17, Y: 297 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };
    measurementArrows.knee_width = {
        mirror: false,
        coords: [{ X: -286, Y: 727 }, { X: -93, Y: 744 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };
    measurementArrows.pant_sleeve_width = {
        mirror: false,
        coords: [{ X: -301, Y: 1071 }, { X: -152, Y: 1084 }],
        style: arcStyle,
        lift: false,
        color: arrowColor
    };

    measurementArrows.shoe_inside_length = {
        mirror: false,
        coords: [{ X: 169, Y: 984 }, { X: 132, Y: 18 }],
        style: "line",
        lift: false,
        color: arrowColor
    };

    measurementArrows.hat_width = {
        mirror: false,
        coords: [{ X: 534, Y: 238 },
            { X: 539, Y: 265, cp1X: 559, cp1Y: 236, cp2X: 567, cp2Y: 252 },
            { X: 70, Y: 262, cp1X: 352, cp1Y: 353, cp2X: 223, cp2Y: 351 },
            { X: 77, Y: 242, cp1X: 38, cp1Y: 241, cp2X: 60, cp2Y: 234 }],
        midCircle: { X: 300, Y: 325 },
        style: "line",
        lift: false,
        color: arrowColor
    };

    itemDrawing.mirror = true;
    itemDrawing.coords = [];
    itemDrawing.accents = [];
    // load item drawing
    switch (itemTypeArr[0]) {

        case 1:	// shirts/coats
            i18n.MEASUREMENT.hips = i18n.MEASUREMENT.hem;
            i18n.MEASUREMENT.pantWaist = i18n.MEASUREMENT.hem;

            switch (itemTypeArr[1]) { // collar
                case 2:	// tight (turnover)
                    itemDrawing.coords.push({ X: 0, Y: -60 }, {
                        X: 119,
                        Y: -48,
                        cp1X: 68,
                        cp1Y: -60,
                        cp2X: 106,
                        cp2Y: -57
                    }, { X: 128, Y: 0 });
                    itemDrawing.accents.push({
                        type: "area", coords: [{ X: 0, Y: -47 },
                            { X: 100, Y: -35, cp1X: 64, cp1Y: -48, cp2X: 105, cp2Y: -47 },
                            { X: -5, Y: 59, cp1X: 66, cp1Y: 8, cp2X: 6, cp2Y: 40 },
                            { X: -104, Y: -34, cp1X: -25, cp1Y: 32, cp2X: -93, cp2Y: -12 },
                            { X: 0, Y: -46, cp1X: -117, cp1Y: -48, cp2X: -52, cp2Y: -48 }
                        ], noMirror: true
                    });
                    itemDrawing.accents.push({
                        type: "line", coords: [{ X: 129, Y: 0 },
                            { X: 136, Y: 26, cp1X: 132, cp1Y: 14, cp2X: 133, cp2Y: 18 },
                            { X: 78, Y: 125, cp1X: 123, cp1Y: 63, cp2X: 100, cp2Y: 95 },
                            { X: 37, Y: 78, cp1X: 60, cp1Y: 106, cp2X: 51, cp2Y: 101 },
                            { X: -12, Y: 111, cp1X: 24, cp1Y: 8, cp2X: -32, cp2Y: 66 }
                        ], noMirror: true
                    });	// non mirrored turnover collar right
                    itemDrawing.accents.push({
                        type: "line", coords: [{ X: -129, Y: 0 },
                            { X: -136, Y: 26, cp1X: -132, cp1Y: 14, cp2X: -133, cp2Y: 18 },
                            { X: -90, Y: 127, cp1X: -127, cp1Y: 68, cp2X: -106, cp2Y: 110 },
                            { X: -9, Y: 59, cp1X: -33, cp1Y: 88, cp2X: -61, cp2Y: 25 }
                        ], noMirror: true
                    });	// non mirrored turnover collar left
                    itemDrawing.accents.push({ type: "circle", coords: [{ X: 0, Y: 100, R: 5 }] });
                    measurementArrows.neck_opening_width = {
                        mirror: false,
                        coords: [{ X: 0, Y: -47 }, { X: 100, Y: -35, cp1X: 64, cp1Y: -48, cp2X: 105, cp2Y: -47 },
                            { X: -5, Y: 59, cp1X: 66, cp1Y: 8, cp2X: 6, cp2Y: 40 }, {
                                X: -104,
                                Y: -34,
                                cp1X: -25,
                                cp1Y: 32,
                                cp2X: -93,
                                cp2Y: -12
                            },
                            { X: 0, Y: -46, cp1X: -117, cp1Y: -48, cp2X: -52, cp2Y: -48 }],
                        style: "line",
                        lift: false,
                        midCircle: { X: 0, Y: -47 },
                        color: arrowColor
                    };
                    measurementArrows.shoulder_width = {
                        mirror: false,
                        coords: [{ X: -329, Y: 49 }, { X: -129, Y: -5 }],
                        style: "line",
                        lift: true,
                        color: arrowColor
                    };
                    measurementArrows.front_height = {
                        mirror: false,
                        coords: [{ X: -167, Y: -4 }, { X: -167, Y: 978 }],
                        style: "line",
                        lift: false,
                        color: arrowColor
                    };

                    break;
                case 3:	// hood
                    itemDrawing.coords.push({ X: 0, Y: -390 }, {
                        X: 185,
                        Y: 6,
                        cp1X: 180,
                        cp1Y: -400,
                        cp2X: 160,
                        cp2Y: -20
                    });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 185, Y: 6 }, { X: 0, Y: 123, cp1X: 140, cp1Y: 70, cp2X: 70, cp2Y: 100 }]
                    });	// basic round collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: -320 }, {
                            X: 144,
                            Y: 0,
                            cp1X: 150,
                            cp1Y: -320,
                            cp2X: 140,
                            cp2Y: -20
                        }, { X: 0, Y: 100, cp1X: 140, cp1Y: 46, cp2X: 40, cp2Y: 92 }]
                    }); // hood area
                    measurementArrows.shoulder_width = {
                        mirror: false,
                        coords: [{ X: -329, Y: 42 }, { X: -174, Y: -7 }],
                        style: "line",
                        lift: true,
                        color: arrowColor
                    };
                    break;
                case 5:	// open high round
                    itemDrawing.coords.push({ X: 0, Y: 90 }, { X: 189, Y: 0 });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 210, Y: 6 }, { X: 0, Y: 123, cp1X: 165, cp1Y: 70, cp2X: 100, cp2Y: 123 }]
                    });	// open round collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: 49 }, { X: 189, Y: 0, cp1X: 100, cp1Y: 47, cp2X: 155, cp2Y: 23 }, {
                            X: 0,
                            Y: 102,
                            cp1X: 165,
                            cp1Y: 46,
                            cp2X: 95,
                            cp2Y: 102
                        }]
                    }); // open collar area
                    break;
                case 6:	// open low round
                    itemDrawing.coords.push({ X: 0, Y: 180 }, { X: 164, Y: 0 });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 181, Y: 5 }, { X: 0, Y: 196, cp1X: 146, cp1Y: 196, cp2X: 50, cp2Y: 196 }]
                    });	// collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: 47 }, { X: 164, Y: 0, cp1X: 55, cp1Y: 45, cp2X: 130, cp2Y: 23 }, {
                            X: 0,
                            Y: 180,
                            cp1X: 130,
                            cp1Y: 180,
                            cp2X: 45,
                            cp2Y: 180
                        }]
                    }); // basic area
                    break;
                case 7:	// v-style high
                    itemDrawing.coords.push({ X: 0, Y: 90 }, { X: 189, Y: 0 });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 210, Y: 6 }, { X: 0, Y: 123, cp1X: 165, cp1Y: 70, cp2X: 80, cp2Y: 100 }]
                    });	// open round collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: 47 }, { X: 189, Y: 0, cp1X: 80, cp1Y: 45, cp2X: 155, cp2Y: 23 }, {
                            X: 0,
                            Y: 100,
                            cp1X: 165,
                            cp1Y: 46,
                            cp2X: 65,
                            cp2Y: 92
                        }]
                    }); // open collar area
                    break;
                case 8:	// v-style low
                    itemDrawing.coords.push({ X: 0, Y: 90 }, { X: 189, Y: 0 });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 210, Y: 6 }, { X: 0, Y: 123, cp1X: 165, cp1Y: 70, cp2X: 80, cp2Y: 100 }]
                    });	// open round collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: 47 }, { X: 189, Y: 0, cp1X: 80, cp1Y: 45, cp2X: 155, cp2Y: 23 }, {
                            X: 0,
                            Y: 100,
                            cp1X: 165,
                            cp1Y: 46,
                            cp2X: 65,
                            cp2Y: 92
                        }]
                    }); // open collar area
                    break;
                default:	// elastic round
                    itemDrawing.coords.push({ X: 0, Y: 90 }, { X: 164, Y: 0 });
                    itemDrawing.accents.push({
                        type: "line",
                        coords: [{ X: 185, Y: 6 }, { X: 0, Y: 110, cp1X: 140, cp1Y: 70, cp2X: 70, cp2Y: 108 }]
                    });	// basic round collar line
                    itemDrawing.accents.push({
                        type: "area",
                        coords: [{ X: 0, Y: 47 }, { X: 164, Y: 0, cp1X: 55, cp1Y: 45, cp2X: 130, cp2Y: 23 }, {
                            X: 0,
                            Y: 90,
                            cp1X: 140,
                            cp1Y: 46,
                            cp2X: 55,
                            cp2Y: 90
                        }]
                    }); // basic area
                    break;
            }

            switch (itemTypeArr[3]) { // sleeve length
                case 0:	// tank top, string top or poncho
                case 1:	// very short (vest)
                    itemDrawing.coords.push({ X: 289, Y: 34 });
                    itemDrawing.coords.push({ X: 250, Y: 399, cp1X: 285, cp1Y: 44, cp2X: 220, cp2Y: 389 });
                    measurementArrows.shoulder_width = {
                        mirror: false,
                        coords: [{ X: -299, Y: 32 }, { X: -164, Y: -7 }],
                        style: "line",
                        lift: true,
                        color: arrowColor
                    };
                    measurementArrows.sleeve_top_width = {
                        mirror: false,
                        coords: [{ X: 250, Y: 399 }, { X: 289, Y: 34 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };

                    if (itemTypeArr[4] !== 0) {
                        // is it you, poncho?
                        itemDrawing.coords.push({ X: 250, Y: 399, cp1X: 328, cp1Y: 44, cp2X: 250, cp2Y: 260 });
                        fitOrder.splice(13, 1);  // remove sleeve top
                        measurementArrows.sleeve_top_width = false;
                    }
                    break;
                case 2:  // short
                case 3:  // short-medium (normal t-shirt)
                    itemDrawing.coords.push({ X: 329, Y: 44 });
                    itemDrawing.coords.push({ X: 482, Y: 460 }, { X: 324, Y: 529 });
                    itemDrawing.coords.push({ X: 250, Y: 399 });

                    measurementArrows.sleeve_top_width = {
                        mirror: false,
                        coords: [{ X: 250, Y: 399 }, { X: 430, Y: 322 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };
                    measurementArrows.wrist_width = {
                        mirror: false,
                        coords: [{ X: 324, Y: 529 }, { X: 482, Y: 460 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };

                    i18n.MEASUREMENT.wrist_width = i18n.MEASUREMENT.sleeve_opening;

                    switch (itemTypeArr[2]) { // shoulder types
                        case 3:	// dropped
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, { X: 381, Y: 184 }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 482, Y: 460 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 406, Y: 243 },
                                color: arrowColor
                            };
                            break;
                        case 2:	// raglan line
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 185,
                                    Y: 6,
                                    cp1X: 220,
                                    cp1Y: 320,
                                    cp2X: 185,
                                    cp2Y: 6
                                }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 482, Y: 460 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 406, Y: 243 },
                                color: arrowColor
                            };
                            break;
                        case 1:	// normal shoulder line
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 329, Y: 44 }, { X: 482, Y: 460 }],
                                style: "line",
                                lift: true,
                                color: arrowColor
                            };
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 329,
                                    Y: 44,
                                    cp1X: 250,
                                    cp1Y: 250,
                                    cp2X: 300,
                                    cp2Y: 70
                                }]
                            });
                            break;
                    }
                    break;
                case 4:  // medium
                case 5:  // semi-long
                    itemDrawing.coords.push({ X: 329, Y: 44 });
                    itemDrawing.coords.push({ X: 527, Y: 719 }, { X: 389, Y: 769 });
                    itemDrawing.coords.push({ X: 250, Y: 399 });

                    measurementArrows.sleeve_top_width = {
                        mirror: false,
                        coords: [{ X: 250, Y: 399 }, { X: 419, Y: 340 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };
                    measurementArrows.wrist_width = {
                        mirror: false,
                        coords: [{ X: 389, Y: 769 }, { X: 527, Y: 719 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };

                    i18n.MEASUREMENT.wrist_width = i18n.MEASUREMENT.sleeve_opening;

                    switch (itemTypeArr[2]) { // shoulder types
                        case 3:	// dropped
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, { X: 369, Y: 196 }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 527, Y: 719 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 450, Y: 444 },
                                color: arrowColor
                            };
                            break;
                        case 2:	// raglan line
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 185,
                                    Y: 6,
                                    cp1X: 220,
                                    cp1Y: 320,
                                    cp2X: 185,
                                    cp2Y: 6
                                }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 527, Y: 719 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 450, Y: 444 },
                                color: arrowColor
                            };
                            break;
                        case 1:	// normal shoulder line
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 329, Y: 44 }, { X: 527, Y: 719 }],
                                style: "line",
                                lift: true,
                                color: arrowColor
                            };
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 329,
                                    Y: 44,
                                    cp1X: 250,
                                    cp1Y: 250,
                                    cp2X: 300,
                                    cp2Y: 70
                                }]
                            });
                            break;
                    }
                    break;
                case 6:  // long
                case 7:  // very long
                case 8:  // extra long
                    itemDrawing.coords.push({ X: 329, Y: 44 });
                    measurementArrows.sleeve_top_width = {
                        mirror: false,
                        coords: [{ X: 250, Y: 399 }, { X: 410, Y: 348 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };

                    if (itemTypeArr[4] === 1) {	// elastic
                        itemDrawing.coords.push({ X: 556, Y: 902 }, { X: 547, Y: 930 }, { X: 557, Y: 978 }, {
                            X: 463,
                            Y: 998
                        }, { X: 449, Y: 951 }, { X: 430, Y: 934 });
                        itemDrawing.accents.push({ type: "line", coords: [{ X: 465, Y: 944 }, { X: 476, Y: 996 }] },
                            { type: "line", coords: [{ X: 476, Y: 941 }, { X: 487, Y: 993 }] },
                            { type: "line", coords: [{ X: 487, Y: 938 }, { X: 498, Y: 990 }] },
                            { type: "line", coords: [{ X: 498, Y: 935 }, { X: 509, Y: 987 }] },
                            { type: "line", coords: [{ X: 509, Y: 932 }, { X: 520, Y: 984 }] },
                            { type: "line", coords: [{ X: 520, Y: 929 }, { X: 531, Y: 981 }] },
                            { type: "line", coords: [{ X: 531, Y: 926 }, { X: 542, Y: 978 }] });
                        itemDrawing.coords.push({ X: 250, Y: 399 });
                        measurementArrows.wrist_width = {
                            mirror: false,
                            coords: [{ X: 430, Y: 934 }, { X: 556, Y: 902 }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    } else {
                        itemDrawing.coords.push({ X: 571, Y: 978 }, { X: 454, Y: 1009 });
                        itemDrawing.coords.push({ X: 250, Y: 399 });
                        measurementArrows.wrist_width = {
                            mirror: false,
                            coords: [{ X: 571, Y: 978 }, { X: 454, Y: 1009 }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    }

                    switch (itemTypeArr[2]) { // shoulder types
                        case 3:	// dropped
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, { X: 369, Y: 196 }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 571, Y: 978 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 437, Y: 444 },
                                color: arrowColor
                            };
                            break;
                        case 2:	// raglan line
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 185,
                                    Y: 6,
                                    cp1X: 220,
                                    cp1Y: 320,
                                    cp2X: 185,
                                    cp2Y: 6
                                }]
                            });
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 174, Y: -16 }, { X: 329, Y: 27 }, { X: 571, Y: 978 }],
                                style: "line",
                                lift: true,
                                midCircle: { X: 437, Y: 444 },
                                color: arrowColor
                            };
                            break;
                        case 1:	// normal shoulder line
                            measurementArrows.sleeve = {
                                mirror: false,
                                coords: [{ X: 329, Y: 44 }, { X: 569, Y: 975 }],
                                style: "line",
                                lift: true,
                                color: arrowColor
                            };
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: 250, Y: 399 }, {
                                    X: 329,
                                    Y: 44,
                                    cp1X: 250,
                                    cp1Y: 250,
                                    cp2X: 300,
                                    cp2Y: 70
                                }]
                            });
                            break;
                    }
                    break;
            }

            switch (itemTypeArr[5]) { // waistband
                case 0:	// poncho dude
                    itemDrawing.coords.push({ X: 550, Y: 750, cp1X: 450, cp1Y: 70, cp2X: 450, cp2Y: 550 });
                    itemDrawing.coords.push({ X: 0, Y: 1038, cp1X: 450, cp1Y: 800, cp2X: 400, cp2Y: 1038 });
                    measurementArrows.front_height = {
                        mirror: false,
                        coords: [{ X: -174, Y: 5 }, { X: -174, Y: 1018 }],
                        style: "line",
                        lift: false,
                        color: arrowColor
                    };
                    measurementArrows.sleeve = {
                        mirror: false,
                        coords: [{ X: 174, Y: 0 }, { X: 394, Y: 59 }, { X: 550, Y: 750 }],
                        style: "line",
                        lift: true,
                        midCircle: { X: 480, Y: 444 },
                        color: arrowColor
                    };
                    break;
                case 3:	// pant waist
                    if (itemTypeArr[6] === 1) {	// elastic
                        itemDrawing.coords.push({
                            X: 250,
                            Y: 908,
                            cp1X: 247,
                            cp1Y: 402,
                            cp2X: 247,
                            cp2Y: 858
                        }, { X: 230, Y: 978 }, { X: 0, Y: 978 });
                        // eslint-disable-next-line
                        for (let $i = 0; $i < 15; $i++) {
                            const $x = Math.round(($i + 0.5) * (230 / 15));
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: $x, Y: 918 }, { X: $x, Y: 978 }]
                            });
                        }
                        measurementArrows.pant_waist = {
                            mirror: false,
                            coords: [{ X: -250, Y: 908 }, { X: 250, Y: 908 }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    } else {
                        itemDrawing.coords.push({
                            X: 250,
                            Y: 978,
                            cp1X: 245,
                            cp1Y: 402,
                            cp2X: 245,
                            cp2Y: 928
                        }, { X: 0, Y: 978 });
                        measurementArrows.pant_waist = {
                            mirror: false,
                            coords: [{ X: -250, Y: 978 }, { X: 250, Y: 978 }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    }
                    break;
                case 4:	// hips
                /* falls through */
                case 5:	// half-way-thigh
                /* falls through */
                default: {
                    let $baseY = 978;
                    if (itemTypeArr[5] === 5) {
                        $baseY = 1038;
                    }
                    if (itemTypeArr[6] === 1) {	// elastic
                        itemDrawing.coords.push({
                            X: 250,
                            Y: $baseY,
                            cp1X: 247,
                            cp1Y: 402,
                            cp2X: 247,
                            cp2Y: 908
                        }, { X: 230, Y: ($baseY + 60) }, { X: 0, Y: ($baseY + 60) });
                        // eslint-disable-next-line
                        for (let $i = 0; $i < 15; $i++) {
                            const $x = Math.round(($i + 0.5) * (230 / 15));
                            itemDrawing.accents.push({
                                type: "line",
                                coords: [{ X: $x, Y: ($baseY + 10) }, { X: $x, Y: ($baseY + 60) }]
                            });
                        }
                        measurementArrows.front_height.coords[1].Y = ($baseY + 60);
                        measurementArrows.hips = {
                            mirror: false,
                            coords: [{ X: -250, Y: $baseY }, { X: 250, Y: $baseY }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    } else {
                        itemDrawing.coords.push({
                            X: 250,
                            Y: ($baseY + 60),
                            cp1X: 245,
                            cp1Y: 402,
                            cp2X: 245,
                            cp2Y: $baseY
                        }, { X: 0, Y: ($baseY + 60) });
                        measurementArrows.front_height.coords[1].Y = ($baseY + 60);
                        measurementArrows.hips = {
                            mirror: false,
                            coords: [{ X: -250, Y: ($baseY + 60) }, { X: 250, Y: ($baseY + 60) }],
                            style: arcStyle,
                            lift: false,
                            color: arrowColor
                        };
                    }
                    // define just in case
                    measurementArrows.pant_waist = {
                        mirror: false,
                        coords: [{ X: -250, Y: 958 }, { X: 250, Y: 958 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };
                }
            }

            break;	// case 1 shirts/coats

        case 2:	// trousers/shorts
            itemDrawing.mirror = false; // for accents mainly
            itemDrawing.coords.push({ X: -232, Y: 0 }, {
                X: 222,
                Y: 0,
                cp1X: -100,
                cp1Y: 10,
                cp2X: 90,
                cp2Y: 10
            }, { X: 263, Y: 171 });

            switch (itemTypeArr[3]) { // sleeve
                case 1:	// very short
                case 2:	// short
                case 3:	// short-medium
                    itemDrawing.coords.push({ X: 278, Y: 449 }, { X: 38, Y: 474 });
                    break;
                case 4:	// medium
                    itemDrawing.coords.push({ X: 291, Y: 626 }, { X: 71, Y: 651 });
                    break;
                case 5:  // semi-long
                case 6:  // long
                    itemDrawing.coords.push({ X: 302, Y: 1071 }, { X: 151, Y: 1084 });
                    break;
            }

            itemDrawing.coords.push({ X: 5, Y: 297 }, { X: -17, Y: 297 });

            switch (itemTypeArr[3]) { // sleeve again as not mirror
                case 1:	// very short
                case 2:	// short
                case 3:	// short-medium
                    itemDrawing.coords.push({ X: -38, Y: 474 }, { X: -278, Y: 449 });
                    measurementArrows.outseam = {
                        mirror: false,
                        coords: [{ X: 222, Y: 0 }, { X: 263, Y: 171 }, { X: 278, Y: 449 }],
                        style: "line",
                        lift: true,
                        color: arrowColor
                    };
                    measurementArrows.knee_width = {
                        mirror: false,
                        coords: [{ X: -278, Y: 449 }, { X: -38, Y: 474 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };
                    break;
                case 4:	// medium
                    itemDrawing.coords.push({ X: -71, Y: 651 }, { X: -291, Y: 626 });
                    measurementArrows.outseam = {
                        mirror: false,
                        coords: [{ X: 222, Y: 0 }, { X: 263, Y: 171 }, { X: 291, Y: 626 }],
                        style: "line",
                        lift: true,
                        color: arrowColor
                    };
                    measurementArrows.knee_width = {
                        mirror: false,
                        coords: [{ X: -291, Y: 626 }, { X: -71, Y: 651 }],
                        style: arcStyle,
                        lift: false,
                        color: arrowColor
                    };
                    break;
                case 5:  // semi-long
                case 6:  // long
                    itemDrawing.coords.push({ X: -152, Y: 1084 }, { X: -301, Y: 1071 });
                    break;
            }

            itemDrawing.coords.push({ X: -261, Y: 171 });
            itemDrawing.accents.push(
                {
                    type: "area",
                    coords: [{ X: -232, Y: 0 }, { X: 222, Y: 0, cp1X: -100, cp1Y: 10, cp2X: 90, cp2Y: 10 }, {
                        X: -232,
                        Y: 0,
                        cp1X: 122,
                        cp1Y: 40,
                        cp2X: -132,
                        cp2Y: 40
                    }]
                },
                {
                    type: "line",
                    coords: [{ X: -237, Y: 37 }, { X: 229, Y: 37, cp1X: -137, cp1Y: 76, cp2X: 129, cp2Y: 76 }]
                },
                {
                    type: "line",
                    coords: [{ X: -14, Y: 19 }, { X: -8, Y: 297, cp1X: 3, cp1Y: 114, cp2X: 0, cp2Y: 215 }]
                },
                {
                    type: "line",
                    coords: [{ X: -4, Y: 254 }, { X: 29, Y: 64, cp1X: 34, cp1Y: 242, cp2X: 35, cp2Y: 188 }]
                },
                {
                    type: "line",
                    coords: [{ X: -233, Y: 160 }, { X: -147, Y: 81, cp1X: -182, cp1Y: 157, cp2X: -152, cp2Y: 123 }]
                },
                {
                    type: "line",
                    coords: [{ X: 150, Y: 85 }, { X: 236, Y: 164, cp1X: 158, cp1Y: 128, cp2X: 195, cp2Y: 160 }]
                });
            if (itemTypeArr[6] === "4") {	// rope waistband
                itemDrawing.accents.push(
                    {
                        type: "line",
                        coords: [{ X: 9, Y: 49 }, { X: 8, Y: 47, cp1X: -24, cp1Y: 168, cp2X: -69, cp2Y: 84 }]
                    },
                    {
                        type: "line",
                        coords: [{ X: 9, Y: 50 }, { X: 8, Y: 49, cp1X: 47, cp1Y: 149, cp2X: 70, cp2Y: 99 }]
                    },
                    {
                        type: "line",
                        coords: [{ X: 9, Y: 49 }, { X: 49, Y: 49, cp1X: 27, cp1Y: 59, cp2X: 36, cp2Y: 54 }]
                    },
                    {
                        type: "line",
                        coords: [{ X: 9, Y: 49 }, { X: 9, Y: 64, cp1X: 11, cp1Y: 54, cp2X: 11, cp2Y: 54 }]
                    });
            } else {
                itemDrawing.accents.push({ type: "circle", coords: [{ X: 9, Y: 48, R: 10 }] });
            }

            break; 	// case 2 trousers

        case 3:	// shoes for my friends
            itemDrawing.mirror = false;
            itemDrawing.coords = [{ X: 130, Y: 0 }, { X: 363, Y: 456, cp1X: 240, cp1Y: 8, cp2X: 345, cp2Y: 214 },
                { X: 328, Y: 633, cp1X: 358, cp1Y: 532, cp2X: 328, cp2Y: 564 }, {
                    X: 182,
                    Y: 999,
                    cp1X: 330,
                    cp1Y: 732,
                    cp2X: 327,
                    cp2Y: 994
                },
                { X: 48, Y: 628, cp1X: 3, cp1Y: 994, cp2X: 48, cp2Y: 789 },
                { X: 0, Y: 340, cp1X: 42, cp1Y: 447, cp2X: 0, cp2Y: 444 }, {
                    X: 130,
                    Y: 0,
                    cp1X: 0,
                    cp1Y: 114,
                    cp2X: 72,
                    cp2Y: 0
                }];
            itemDrawing.accents = [
                {
                    type: "area",
                    coords: [{ X: 164, Y: 625 }, {
                        X: 266,
                        Y: 716,
                        cp1X: 270,
                        cp1Y: 632,
                        cp2X: 276,
                        cp2Y: 638
                    }, { X: 168, Y: 990, cp1X: 236, cp1Y: 982, cp2X: 208, cp2Y: 987 },
                        { X: 69, Y: 716, cp1X: 92, cp1Y: 978, cp2X: 83, cp2Y: 852 }, {
                            X: 164,
                            Y: 625,
                            cp1X: 64,
                            cp1Y: 641,
                            cp2X: 57,
                            cp2Y: 628
                        }]
                },
                {
                    type: "line",
                    coords: [{ X: 103, Y: 431 }, { X: 212, Y: 430, cp1X: 112, cp1Y: 404, cp2X: 203, cp2Y: 405 }]
                },
                {
                    type: "line",
                    coords: [{ X: 115, Y: 469 }, { X: 200, Y: 469, cp1X: 121, cp1Y: 447, cp2X: 188, cp2Y: 450 }]
                },
                {
                    type: "line",
                    coords: [{ X: 115, Y: 506 }, { X: 200, Y: 506, cp1X: 121, cp1Y: 484, cp2X: 188, cp2Y: 484 }]
                },
                {
                    type: "line",
                    coords: [{ X: 115, Y: 555 }, { X: 200, Y: 555, cp1X: 121, cp1Y: 533, cp2X: 188, cp2Y: 533 }]
                },
                {
                    type: "line",
                    coords: [{ X: 164, Y: 539 }, {
                        X: 283,
                        Y: 541,
                        cp1X: 242,
                        cp1Y: 523,
                        cp2X: 279,
                        cp2Y: 609
                    }, { X: 164, Y: 539, cp1X: 277, cp1Y: 492, cp2X: 209, cp2Y: 515 }]
                },
                {
                    type: "line",
                    coords: [{ X: 164, Y: 539 }, {
                        X: 45,
                        Y: 492,
                        cp1X: 123,
                        cp1Y: 517,
                        cp2X: 34,
                        cp2Y: 532
                    }, { X: 164, Y: 539, cp1X: 65, cp1Y: 457, cp2X: 129, cp2Y: 509 }]
                }
            ];
            break;	// case 3 shoes

        case 4:	// hats off
            switch (itemTypeArr[1]) {
                case 1:	// bucket
                    itemDrawing.mirror = false;
                    itemDrawing.coords = [{ X: 300, Y: 0 },
                        { X: 522, Y: 214, cp1X: 452, cp1Y: 17, cp2X: 458, cp2Y: 61 },
                        { X: 599, Y: 311, cp1X: 594, cp1Y: 245, cp2X: 601, cp2Y: 283 },
                        { X: 293, Y: 437, cp1X: 597, cp1Y: 361, cp2X: 494, cp2Y: 433 },
                        { X: 0, Y: 306, cp1X: 87, cp1Y: 433, cp2X: 2, cp2Y: 355 },
                        { X: 92, Y: 209, cp1X: 1, cp1Y: 258, cp2X: 44, cp2Y: 227 },
                        { X: 300, Y: 0, cp1X: 156, cp1Y: 28, cp2X: 186, cp2Y: 16 }];
                    itemDrawing.accents = [
                        {
                            type: "line",
                            coords: [{ X: 222, Y: 48 }, { X: 367, Y: 43, cp1X: 269, cp1Y: 29, cp2X: 288, cp2Y: 64 }]
                        },
                        {
                            type: "line", coords: [{ X: 523, Y: 214 }, { X: 544, Y: 280 },
                            { X: 63, Y: 278, cp1X: 376, cp1Y: 368, cp2X: 209, cp2Y: 373 }, { X: 92, Y: 209 }]
                        }];
                    break;
            }
            break;	// case 4 hats
    }

    return {
        measurementArrows,
        itemDrawing
    };
}