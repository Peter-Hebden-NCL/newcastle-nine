
// Default location - SAGE Gatehead

pos = {
            lat: 54.967762,
            lng: -1.602929
        };

// Length of one degree latitude @ 54.979067 latitude
lat_metres = 111323.10;
// Length of one degree longitude @ 54.979067 latitude
lng_metres = 64027.42;

browser_info = navigator.appVersion;

//Required proximity to location (in metres)
trigger_dist = 50;

//Globally defining these for map-link clicks
location_type = "";
clicked = "";

//...and for NOTIFICATIONS
last_visited = {};

//iOS back button
breadcrumb = ["front"];

//Converting degrees into metres
function coord_metres(x, dir) {
            if (x < 0) {
                x = (0 - x);
            }
            if (dir == "lat") {
                x = (x * lat_metres);
                return x;
            }
            if (dir == "lng") {
                x = (x * lng_metres);
                return x;
            }
        };

// Calculating as-the-crow-flies distance (hyp) from lat and lng distance
function hypot_coords(lat_dist, lng_dist) {
            if (lat_dist < 0) {
                lat_dist = (0 - lat_dist);
            }
            if (lng_dist < 0) {
                lng_dist = (0 - lng_dist);
            }

            lat_dist_m = coord_metres(lat_dist, "lat");
            lng_dist_m = coord_metres(lng_dist, "lng");

            hyp_sq = (lat_dist_m * lat_dist_m) + (lng_dist_m * lng_dist_m);

            hyp = Math.sqrt(hyp_sq);
            return hyp;
        };

//Setting default Google Map zoom level
map_zoom = 17;

//Defining custom map styles
map_style = [  {    "elementType": "geometry.fill",    "stylers": [      {        "color": "#ece9de"      }    ]  },  {    "elementType": "labels.icon",    "stylers": [      {        "visibility": "off"      }    ]  },  {    "elementType": "labels.text.fill",    "stylers": [      {        "color": "#000000"      }    ]  },  {    "elementType": "labels.text.stroke",    "stylers": [      {        "visibility": "off"      }    ]  },  {    "featureType": "landscape.man_made",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#c7c7c4"      }    ]  },  {    "featureType": "landscape.man_made",    "elementType": "geometry.stroke",    "stylers": [      {        "color": "#959593"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry",    "stylers": [      {        "color": "#eeeeee"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#9d9a9c"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry.stroke",    "stylers": [      {        "color": "#424143"      }    ]  },  {    "featureType": "poi.attraction",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "poi.park",    "elementType": "geometry",    "stylers": [      {        "color": "#e5e5e5"      }    ]  },  {    "featureType": "poi.park",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#69c65f"      }    ]  },  {    "featureType": "poi.place_of_worship",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "poi.sports_complex",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "road",    "elementType": "geometry",    "stylers": [      {        "color": "#ffffff"      }    ]  },  {    "featureType": "road.highway",    "elementType": "geometry",    "stylers": [      {        "color": "#dadada"      }    ]  },  {    "featureType": "road.highway",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#757575"      }    ]  },  {    "featureType": "transit",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "transit.line",    "elementType": "geometry",    "stylers": [      {        "color": "#626262"      }    ]  },  {    "featureType": "water",    "elementType": "geometry",    "stylers": [      {        "color": "#c9c9c9"      }    ]  },  {    "featureType": "water",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#60caf0"      }    ]  }]


//Recording actual visited locations before 'Reveal All' is used
the_truth = {};

//Tracking value of Reveal All slider
reveal_val = "";

//Tracking value of the Zoom slider
zoom_val = "";


// EDITED FOR REDUX
map_locations = {
    venues :
        {/* VENUE MARKERS DISABLED POST-FESTIVAL
        NorthernStage :
            {
            position:
                {
                lat: 54.979266, 
                lng: -1.615025
                },
            list_id: "NorthernStage",
            name: "Northern Stage",
            page: "",
            marker: null,
            label: null
            },
        SageGateshead :
            {
            position:
                {
                lat: 54.967163, 
                lng: -1.601756
                },
            list_id: "SageGateshead",
            name: "Sage Gateshead",
            page: "",
            marker: null,
            label: null
            }
        */},
    poems : 
        {/*
        UniTest :
            {
            position:
                {
                lat: 54.979462, 
                lng: -1.615197
                },
            list_id: "UniTest",
            name: "The Arches",
            poet: "Basil Bunting",
            title: "Briggflatts (Coda)",
            page: "",
            marker: null,
            label: null,
            found: false
            },*/
        BlackGate :
            {
            position:
                {
                lat: 54.968989, 
                lng: -1.611056
                },
            list_id: "BlackGate",
            name: "The Black Gate",
            poet: "Jake Campbell",
            title: "Pons Aelius City Limits",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>The Black Gate</p>"
            },
        CarliolSquare :
            {
            position:
                {
                lat: 54.972915, 
                lng: -1.608699
                },
            list_id: "CarliolSquare",
            name: "Carliol Square",
            poet: "Tracy Elisabeth Gillman",
            title: "Panopticon",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Carliol Square</p>"
            },
        CentralStation :
            {
            position:
                {
                lat: 54.969249, 
                lng: -1.616872
                },
            list_id: "CentralStation",
            name: "Central Station",
            poet: "Joanne Brooks",
            title: "A Light for Newcastle",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Central Station</p>"
            },
        CivicCentre :
            {
            position:
                {
                lat: 54.978615, 
                lng: -1.611766
                },
            list_id: "CivicCentre",
            name: "Newcastle Civic Centre",
            poet: "Heather Wilson",
            title: "Fortiter Defendit Triumphans",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Civic Centre</p>"
            },
        CrownPosada :
            {
            position:
                {
                lat: 54.969352, 
                lng: -1.608709
                },
            list_id: "CrownPosada",
            name: "Crown Posada",
            poet: "Bernadette McAloon",
            title: "Mistress of the Crown",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>The Crown Posada</p>"
            },
        DogLeap :
            {
            position:
                {
                lat: 54.969512, 
                lng: -1.609669
                },
            list_id: "DogLeap",
            name: "Dog Leap Stairs",
            poet: "Peter Hebden",
            title: "Thin Riddle",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Dog Lead Stairs</p>"
            },
        GraingerMarket :
            {
            position:
                {
                lat: 54.973031, 
                lng: -1.613837
                },
            list_id: "GraingerMarket",
            name: "Grainger Market",
            poet: "John Challis",
            title: "Gift of the Gab",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Grainger Market</p>"
            },
        HighFriar :
            {
            position:
                {
                lat: 54.973994, 
                lng: -1.611955
                },
            list_id: "HighFriar",
            name: "High Friar Lane",
            poet: "David Spittle",
            title: "High Friar Lane",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>High Friar Lane</p>"
            },
        Monument :
            {
            position:
                {
                lat: 54.973850, 
                lng: -1.613161
                },
            list_id: "Monument",
            name: "Grey's Monument",
            poet: "Alexander Shaw",
            title: "Up the Monument. Archival Photograph",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Grey's Monument</p>"
            },       
        NorthumberlandStreet :
            {
            position:
                {
                lat: 54.974951,
                lng: -1.612217
                },
            list_id: "NorthumberlandStreet",
            name: "Northumberland Street",
            poet: "Claudia Simmons",
            title: "Owl in Daylight",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Northumberland Street</p>"
            },
        Quayside :
            {
            position:
                {
                lat: 54.968775, 
                lng: -1.605502
                },
            list_id: "Quayside",
            name: "Newcastle Quayside",
            poet: "Theresa Mun&#771;oz",
            title: "The Quayside",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Newcastle Quayside</p>"
            },
        TheResponse :
            {
            position:
                {
                lat: 54.978583, 
                lng: -1.612788
                },
            list_id: "TheResponse",
            name: "The Response War Memorial",
            poet: "Jason Lytollis",
            title: "Marching Music",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>The Response War Memorial</p>"
            },
        StMarys :
            {
            position:
                {
                lat: 54.966806,
                lng: -1.603993
                },
            list_id: "StMarys",
            name: "St Mary's Heritage Centre",
            poet: "Wajid Hussain",
            title: "St. Mary's Story",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>St. Mary's Heritage Centre</p>"
            },
        StNicholas :
            {
            position:
                {
                lat: 54.970195, 
                lng: -1.612104
                },
            list_id: "StNicholas",
            name: "The Cathedral Church of St Nicholas",
            poet: "Mandana Mashayekhi Ghoyonloo",
            title: "Haven",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>The Cathedral Church of St Nicholas</p>"
            },
        SwingBridge :
            {
            position:
                {
                lat: 54.967401, 
                lng: -1.607597
                },
            list_id: "SwingBridge",
            name: "The Swing Bridge",
            poet: "Kris Johnson",
            title: "So Much Depends",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>The Swing Bridge</p>"
            },
        WingedVictory :
            {
            position:
                {
                lat: 54.977738, 
                lng: -1.613596
                },
            list_id: "WingedVictory",
            name: "Winged Victory",
            poet: "Joanne Clement",
            title: "Manes",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "<p>Winged Victory</p>"
            }
        },
    saved: false,
    loaded: false
};

//Array of locations found for REDUX
redux_found_locations = [];

// Functions for loading / creating saved data variables

function load_progress() {
    for (x in map_locations.poems) {
        map_locations.poems[x].found = JSON.parse(localStorage[x]);
    }
    map_locations.loaded = true;
    reveal_val = localStorage.reveal_val;
    the_truth = JSON.parse(localStorage.the_truth);
    console.log("Map location data loaded!");
}

function save_progress() {
    map_locations.saved = true;
    localStorage.progress_saved = map_locations.saved;
    for (x in map_locations.poems) {
        localStorage[x] = JSON.stringify(map_locations.poems[x].found);
    }
    localStorage.reveal_val = reveal_val;
    localStorage.the_truth = JSON.stringify(the_truth);
    console.log("Map location data saved!");
}


// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {



    pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
    
    getMap(pos);

}


// Get map by using coordinates

function getMap(centre) {

    var mapOptions = {
        center: centre,
        zoom: map_zoom,
        styles: map_style,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    //LISTENER TO MAKE MAP CENTRE ON LOCATION ONLY ONCE FULLY LOADED
    
    map.addListener('tilesloaded', function() {
          console.log('...fully loaded!')
          if (location_type != "" && clicked != "") {
            go_to(location_type, clicked.id);
          }
        });

    me_marker = new google.maps.Marker({
        title: "You are here!",
        position: pos,
        icon:'person_icon.png'
    });

    //creating Google markers and labels
    window.poem_labels = [];
    for (poem in map_locations.poems) {

        if (map_locations.poems[poem].found == true) {

            map_locations.poems[poem].marker = new google.maps.Marker({
                position: {
                    lat: map_locations.poems[poem].position.lat, 
                    lng: map_locations.poems[poem].position.lng
                },
                title: map_locations.poems[poem].name,
                icon: 'found_marker.png'
            });

            map_locations.poems[poem].label = new google.maps.InfoWindow({
                            content: 
                                "<p><a id='" + map_locations.poems[poem].list_id + "' href='#" + map_locations.poems[poem].list_id + "' class='location-link'>" + 
                                map_locations.poems[poem].name + 
                                "</a></p>" + 
                                "<p>" + map_locations.poems[poem].title + " by " + map_locations.poems[poem].poet + "</p>" +
                                "<p><a id='" + map_locations.poems[poem].list_id + "' href='#" + map_locations.poems[poem].list_id + "' class='poem-link'>" +
                                "Read this poem" +
                                "</a></p>"
            });

        } else {

            map_locations.poems[poem].marker = new google.maps.Marker({
                position: {
                    lat: map_locations.poems[poem].position.lat, 
                    lng: map_locations.poems[poem].position.lng
                },
                title: map_locations.poems[poem].name,
                icon: 'default_marker.png'
            });

            map_locations.poems[poem].label = new google.maps.InfoWindow({
                            content: 
                                "<p><a id='" + map_locations.poems[poem].list_id + "' href='#" + map_locations.poems[poem].list_id + "' class='location-link'>" + 
                                map_locations.poems[poem].name + 
                                "</a></p>" + 
                                "<p><em>Not visited yet!</em></p>"
            });
        }

        poem_labels.push({title: map_locations.poems[poem].marker.title, label: map_locations.poems[poem].label});

        google.maps.event.addListener(map_locations.poems[poem].marker, 'click', function() {
            close_labels();
            for (n = 0; n < poem_labels.length; n++) {
                if (poem_labels[n].title == this.title) {
                    poem_labels[n].label.open(map, this);
                }
            }
        });

        map_locations.poems[poem].marker.setMap(map);
        update_location_list();
        update_redux_poem();
    }

    //VENUE MARKERS DISABLED FOR POST-FESTIVAL VERSION ?
    
    window.venue_labels = [];
    for (venue in map_locations.venues) {
        map_locations.venues[venue].marker = new google.maps.Marker({
            position: {
                lat: map_locations.venues[venue].position.lat, 
                lng: map_locations.venues[venue].position.lng
            },
            title: map_locations.venues[venue].name,
            icon: map_locations.venues[venue].list_id+'_marker.png'
        });

        map_locations.venues[venue].marker.setMap(map);

        map_locations.venues[venue].label = new google.maps.InfoWindow({
                        content: "<br/><strong>" + map_locations.venues[venue].name + "</strong><br/>&nbsp;"
                        });

        venue_labels.push({title: map_locations.venues[venue].marker.title, label: map_locations.venues[venue].label});

        google.maps.event.addListener(map_locations.venues[venue].marker, 'click', function() {
            close_labels();
            for (n = 0; n < venue_labels.length; n++) {
                if (venue_labels[n].title == this.title) {
                    venue_labels[n].label.open(map, this);
                }
            }
        });

    }
    

    

    
    window.locations_status = function() {
        for (x in map_locations.poems) {
            if (
                hypot_coords( (map_locations.poems[x].marker.getPosition().lat() - me_marker.getPosition().lat()), (map_locations.poems[x].marker.getPosition().lng() - me_marker.getPosition().lng()) ) <= trigger_dist
                ) {
                console.log('near ' + x);
                console.log(hypot_coords( (map_locations.poems[x].marker.getPosition().lat() - me_marker.getPosition().lat()), (map_locations.poems[x].marker.getPosition().lng() - me_marker.getPosition().lng()) ));

                if (map_locations.poems[x].found != true) {

                    //POP-UP
                    last_visited = map_locations.poems[x];

                    //Respond to new location pop-up
                    function popupCallback(buttonIndex) {
                        if (buttonIndex == 1) {
                            window.location.hash = last_visited.list_id;
                            display_poem(last_visited.list_id);
                        }
                    };
                    
                    //DISABLED FOR REDUX
                    /*
                    navigator.notification.confirm(last_visited.title+" by "+last_visited.poet, popupCallback, last_visited.name, ["Read Poem", "Cancel"]);
                    */

                    //EDITING MAP MARKERS
                    map_locations.poems[x].marker.setIcon("found_marker.png");
                    map_locations.poems[x].label.setContent(
                        "<p><a id='" + map_locations.poems[x].list_id + "' href='#" + map_locations.poems[x].list_id + "' class='location-link'>" + 
                        map_locations.poems[x].name + 
                        "</a></p>" + 
                        "<p>" + map_locations.poems[x].title + " by " + map_locations.poems[x].poet + "</p>" +
                        "<p><a id='" + map_locations.poems[x].list_id + "' href='#" + map_locations.poems[x].list_id + "' class='poem-link'>" +
                        "Read this poem" +
                        "</a></p>"
                    );

                    //UPDATING DATA
                    map_locations.poems[x].found = true;
                    update_location_list();
                    update_redux_poem();
                    save_progress();
                    
                    //VIBRATE
                    navigator.vibrate([300, 150, 300, 150, 300]);
                    console.log("Buzz buzz buzz!");

                    //LOCAL NOTIFCATIONS - disabled for REDUX
                    /*                    
                    cordova.plugins.notification.local.schedule({
                        id: 1,
                        title: "Steps in Time",
                        text: "You visited " + map_locations.poems[poem].name + "! Read " + map_locations.poems[poem].poet + "'s poem here."
                    });
                    console.log("User notified!");
                    */
                    

                    

                }


                        
            }
        }
           
    };

    

    me_marker.setMap(map);
    
    //Checking if device location is outside NewcastleGateshead
    if (
        pos.lat < 54.940365 ||
        pos.lat > 54.999818 ||
        pos.lng < -1.655448 ||
        pos.lng > -1.574509
    ) {
        //POP-UP
        //Respond to new location pop-up
        function myLocationCallback(buttonIndex) {
            if (buttonIndex == 1) {
                //centre on me_marker
                map.setZoom(15);
                map.setCenter(me_marker.getPosition());
            }
            if (buttonIndex == 2) {
                //centre on Sage
                map.setZoom(14);
                map.setCenter({
                    lat: 54.967762,
                    lng: -1.602929
                });
            }
        };

        //DISABLED FOR REDUX
        /*
        navigator.notification.confirm("You seem to be outside central Newcastle and Gateshead. \nWhere would you like to view?", myLocationCallback, "Location", ["My Location", "City Centre"]);
        */


    } else {
        map.setZoom(15);
        map.setCenter(me_marker.getPosition());
    }

    locations_status();
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != pos.lat && updatedLongitude != pos.lng) {

        pos.lat = updatedLatitude;
        pos.lng = updatedLongitude;

        getMap(pos);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');

    function mapErrorCallback(buttonIndex) {
        if (buttonIndex == 1) {
            history.back();
        }        
    }

    function locationErrorCallback(buttonIndex) {
        //nothing here 
    }

    if (error.code == 1) {
        navigator.notification.confirm("Unable to load the map right now.", locationErrorCallback, "Map", ["OK"]);
    }   else {
        navigator.notification.confirm("Unable to get your location right now.", locationErrorCallback, "Location", ["OK"]);
    }
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (updateMarker, onMapError, { enableHighAccuracy: true });
}


function updateMarker(position) {
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != pos.lat || updatedLongitude != pos.lng) {

        // Updating me_marker

        pos.lat = updatedLatitude;
        pos.lng = updatedLongitude;

        var newPoint = new google.maps.LatLng(pos.lat, 
                                             pos.lng);

        me_marker.setPosition(newPoint);

        // Updating locations
        locations_status();

    }
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<








//attaching fastclick.js (eliminating transition delay)
FastClick.attach(document.body);

/* ARRGGHHHHHHH!!!
if (
    browser_info.includes("Macintosh") ||
    browser_info.includes("iPhone") ||
    browser_info.includes("Android 4")
) {
    $(".default-back").addClass("hidden");
    $(".fallback, .fallback-back").removeClass("hidden");
}
*/

//CLICK EVENTS 

//Redux clicks

$("#ncl-poem-redo").click(function() {
    if($("#ncl-poem-text").html() != ""){
        del = confirm("Erase poem?");
        if (del) {
            $("#ncl-poem-text").html("");
            redux_found_locations = [];
            for (x in map_locations.poems) {
                map_locations.poems[x].found = false;
            }
        }
    } else {
        $("#ncl-poem-text").html("<p>Sample line 1</p><p>Sample line 2</p><p>Sample line 3</p><p>Sample line 4</p><p>Sample line 5</p><p>Sample line 6</p><p>Sample line 1</p><p>Sample line 2</p><p>Sample line 3</p><p>Sample line 4</p><p>Sample line 5</p><p>Sample line 6</p><p>Sample line 1</p><p>Sample line 2</p><p>Sample line 3</p><p>Sample line 4</p><p>Sample line 5</p><p>Sample line 6</p><p>Sample line 1</p><p>Sample line 2</p><p>Sample line 3</p><p>Sample line 4</p><p>Sample line 5</p><p>Sample line 6</p><p>Sample line 1</p><p>Sample line 2</p><p>Sample line 3</p><p>Sample line 4</p><p>Sample line 5</p><p>Sample line 6</p>");
    }
});

$("#ncl-poem-print").click(function() {
    $("#front").css({"height":"200vh"});
    $("#ncl-poem-text").css({"overflow-y":"visible"});
    $("#ncl-poem-redo, #ncl-poem-print").addClass("hidden");

    window.print(); 

    setTimeout(
        function(){ 
            $("#front").removeAttr("style");
            $("#ncl-poem-text").css({"overflow-y":"scroll"}); 
            $("#ncl-poem-redo, #ncl-poem-print").removeClass("hidden");
        }, 500);
});


/////////////



$(".how-to-link").click(function() {
    display_howto();
    breadcrumb.push("info");
});
$(".about-link").click(function() {
    display_about();
    breadcrumb.push("info");
});

$(".list-link").click(function() {
    breadcrumb.push("list_view");
});

$(".front-link").click(function() {
    breadcrumb.push("front");
});

$("body").on("click", ".location-link", function() {
    clicked = this;
    display_location(clicked.id);
    breadcrumb.push(clicked.id);
});

$("body").on("click", ".poem-link", function() {
    clicked = this;
    display_poem(clicked.id);
    breadcrumb.push(clicked.id);
});

$("body").on("click", ".map-link", function() {
    if($(this).hasClass("front_navitem")) {
        if (
            $("#map").hasClass("not_loaded")
        ) {
            load_map();
        }
        else {
            watchMapPosition();
        }
    }
    else {
        clicked = this;
        if (
            $(clicked).hasClass("go_to_poem")
        ) {
            location_type = "poems";
        }
        if (
            $(clicked).hasClass("go_to_venue")
        ) {
            location_type = "venues";
        }
        if (
            $("#map").hasClass("not_loaded")
        ) {
            load_map();
        }
        else {
            go_to(location_type, clicked.id);
        }
    }

    breadcrumb.push("map_view");

    if(zoom_val == "on" && $("#display-panel").hasClass("hidden")) {
        $("#display-panel").removeClass("hidden")
    }
    if(zoom_val == "off" && !($("#display-panel").hasClass("hidden"))) {
        $("#display-panel").addClass("hidden")
    }
});

$(".reload-map").click(function(){
    console.log("reload click");
    reload_map();
    $(this).removeClass("ui-btn-active");
});

$(".find-me").click(function(){
    find_me();
    $(this).removeClass("ui-btn-active");
});

$(".display-options").click(function(){
    display_options();
});

$(".back-button").click(function(){
    console.log("back click");
    browser_info = navigator.appVersion;
    breadcrumb.pop();
    //DEVICES UNABLE TO USE BROWSER HISTORY
    if (
        browser_info.indexOf("Macintosh") > -1 ||
        browser_info.indexOf("iPhone") > -1 ||
        browser_info.indexOf("Android 4") > -1 
    ) {
        window.location.hash = breadcrumb[(breadcrumb.length - 1)];
    } else {
        history.go(-1);
    }
    return false;
});

$( "#reveal" ).on('slidestop', function() {
    if ($("#reveal").val() == "on") {
        reveal_val = "on";
        for (x in map_locations.poems) {
            the_truth[x] = map_locations.poems[x].found;
            map_locations.poems[x].found = true;
        }
        save_progress();
    }
    if ($("#reveal").val() == "off") {
        reveal_val = "off";
        for (x in map_locations.poems) {
            map_locations.poems[x].found = the_truth[x];
        }
        save_progress();
    }
    reload_map();
    update_location_list();
    update_redux_poem();
});

$(".how-to-link").click(function(){
    if (reveal_val == "on") {
        $('#reveal').val('on');
        $('#reveal').slider("refresh");
    }
});

$( "#zoom" ).on('slidestop', function() {
    if ($("#zoom").val() == "on") {
        zoom_val = "on";
    }
    if ($("#zoom").val() == "off") {
        zoom_val = "off";
    }
});

$("#zoom-in").click(function(){
    map.setZoom((map.getZoom()+1));
});

$("#zoom-out").click(function(){
    map.setZoom((map.getZoom()-1));
});

$(".text-size-button").click(function(){
    $(".text-size-panel").toggleClass("hidden");
});

$(".text-smaller").click(function(){
    text_size("-");
});

$(".text-larger").click(function(){
    text_size("+");
});

//Loading / creating saved data variables
if (localStorage["progress_saved"]) {
    load_progress();
}
else {
    save_progress();
}

//Modifying back button for exceptions

if (
    //device.model.includes("iPhone5") || device.model.includes("iPhone 5") ||
    //browser_info.includes("Macintosh") ||
    //browser_info.includes("iPhone 9_0") ||
    //browser_info.includes("Android 4")
    //browser_info.indexOf('Macintosh') > -1 ||
    browser_info.indexOf('iPhone 9_0') > -1 ||
    browser_info.indexOf('iPhone OS 9_0') > -1 ||
    browser_info.indexOf('Android 4') > -1
) {
    $(".convert-front").html('<a href="#front" class="front-link" data-transition="slide" data-direction="reverse">Home</a>');
    $(".convert-list").html('<a href="#list_view" class="list-link" data-transition="slide" data-direction="reverse">List</a>');
    //$("#browser_info").html(browser_info);
}

//Generating location list
generate_location_list();

//browser info
$("#browser_info").html(browser_info);



// DISPLAY FUNCTIONS

//Populating the Locations list 
function generate_location_list() {
    location_list_html = "";

    for (x in map_locations.poems) {
            location_list_html = location_list_html.concat(
                "<div class='list-item' id='" + map_locations.poems[x].list_id + "'>" +
                "<div class='ui-grid-solo'>" +
                "<div class='ui-block-a'>" +
                "<a href='#" + map_locations.poems[x].list_id + "' id='" + map_locations.poems[x].list_id + "' class='location-link'>" +
                "<p class='location_name'>" + map_locations.poems[x].name + "</p>" +
                "</a>" +
                "<p class='poem'><em>Not visited yet!</em></p>" +
                "</div>" +
                "</div>" +
                "<div data-role='navbar'><ul>" +
                "<li><a href='#map_view' class='map-link go_to_poem' id='" + map_locations.poems[x].list_id + "'>View on map</a></li>" +
                "<li><a href='#" + map_locations.poems[x].list_id + "' id='" + map_locations.poems[x].list_id + "' class='poem-link ui-disabled'>Poem</a></li>" +            
                "</ul></div>" +
                "</div>"
            );
    }

    $("#list-container").html(location_list_html);
    update_location_list();
    update_redux_poem();
};

//Updating the Locations list with found locations
function update_location_list() {
    for (x in map_locations.poems) {
        if (map_locations.poems[x].found) {
            $(".list-item#" + map_locations.poems[x].list_id + " a.poem-link").removeClass("ui-disabled");
            $(".list-item#" + map_locations.poems[x].list_id + " p.poem").html(map_locations.poems[x].title + " by " + map_locations.poems[x].poet);
            $(".poem_display#" + map_locations.poems[x].list_id + " .poem-tab").removeClass("ui-disabled");
        }
        else {
            $(".list-item#" + map_locations.poems[x].list_id + " a.poem-link").addClass("ui-disabled");
            $(".list-item#" + map_locations.poems[x].list_id + " p.poem").html("<em>Not visited yet!</em>");
            $(".poem_display#" + map_locations.poems[x].list_id + " .poem-tab").addClass("ui-disabled");
        }
    }
};

//Updating the poem display for REDUX
function update_redux_poem() {
    for (x in map_locations.poems) {
        if (
            map_locations.poems[x].found 
            && !(redux_found_locations.includes(map_locations.poems[x].list_id))
        ) {
            redux_found_locations.push(map_locations.poems[x].list_id);
            $("#ncl-poem-text").append(map_locations.poems[x].redux_lines);
        }
    } 
};

//Displaying the "How to use" section
function display_howto() {
    $("#about").addClass("hidden");
    $("#how-to").removeClass("hidden");

    $(".info_navitem").removeClass("ui-btn-active");
    $("#how-to-tab").addClass("ui-btn-active");

    console.log("Click!");
};

//Displaying the "About" section
function display_about() {
    $("#how-to").addClass("hidden");
    $("#about").removeClass("hidden");

    $(".info_navitem").removeClass("ui-btn-active");
    $("#about-tab").addClass("ui-btn-active");
};

//Displaying the "Location" section
function display_location(location_id) {
    $(".poem_display#" + location_id + " #poem").addClass("hidden");
    $(".poem_display#" + location_id + " #location").removeClass("hidden");

    $(".poem_display#" + location_id + " .poem_navitem").removeClass("ui-btn-active");
    $(".poem_display#" + location_id + " .location-tab").addClass("ui-btn-active");
};

//Displaying the "Poem" section
function display_poem(location_id) {
    $(".poem_display#" + location_id + " #location").addClass("hidden");
    $(".poem_display#" + location_id + " #poem").removeClass("hidden");

    $(".poem_display#" + location_id + " .poem_navitem").removeClass("ui-btn-active");
    $(".poem_display#" + location_id + " .poem-tab").addClass("ui-btn-active");
};

//Loading the map when navigating to the Map page for the first time
function load_map() {
    getMapLocation();
    watchMapPosition();
    console.log("Map loaded!");

    $("#map").removeClass("not_loaded");
}

//Reloading the map on the map screen
function reload_map() {
    getMap(pos);
    watchMapPosition();
    console.log("Map (re)loaded!");
}

//Close all info windows
function close_labels() {
    for (n = 0; n < poem_labels.length; n++) {
        poem_labels[n].label.close();
    }
    for (n = 0; n < venue_labels.length; n++) {
        venue_labels[n].label.close();
    }
}

//Centre map on the me_marker
function find_me() {
    watchMapPosition();
    map.panTo(me_marker.getPosition());
    console.log("There you are!");
}

//Centre map on location
function go_to(location_type, location_id) {
    if (location_type == "poems") {
        map.setCenter(map_locations.poems[location_id].position);
        close_labels();
        for (n = 0; n < poem_labels.length; n++) {
            if (poem_labels[n].title == map_locations.poems[location_id].name) {
                poem_labels[n].label.open(map, map_locations.poems[location_id].marker);
            }
        }
    }
    if (location_type == "venues") {
        map.setCenter(map_locations.venues[location_id].position);
        close_labels();
        for (n = 0; n < venue_labels.length; n++) {
            if (venue_labels[n].title == map_locations.venues[location_id].name) {
                venue_labels[n].label.open(map, map_locations.venues[location_id].marker);
            }
        }
    }
    google.maps.event.clearListeners(map, 'tilesloaded');
}


//Open/close display options panel
function display_options() {
    if ($("#display-panel.v_collapsible").css("height") == "0px") {
        $("#display-panel.v_collapsible").css("height", "auto");
        $(".display-options").addClass("ui-btn-active");
    } 
    else {
        $("#display-panel.v_collapsible").css("height", "0px");
        $(".display-options").removeClass("ui-btn-active");
    }
}

//Text size control function
function text_size(sym) {
    if (sym == "+") {
        change_val = 1;
    }
    if (sym == "-") {
        change_val = -1;
    }

    function change_size(elem) {
        fontSize = $(elem).css('font-size').split('px')[0];
        newInt = parseInt(fontSize) + change_val;
        newSize = newInt + 'px';
        $(elem).css({"font-size" : newSize});
    }

    change_size("#location p");
    change_size("#poem .poem_title");
    change_size("#poem .poem_byline");
    change_size("#poem .poem_line");
    change_size("#poem .poem_bio");
    change_size("#poem .poem_epigraph");
    change_size("#poem .poem_note");
}


// INITIALISING APP
steps.app.initialize();