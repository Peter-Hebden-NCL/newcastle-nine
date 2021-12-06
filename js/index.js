//POEM NUMBER CALCULATION

//Factorial and poem-number calculator

number_of_locations = 9;

function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
}


function poem_number(list) {
    full = factorialize(number_of_locations);
    location_num = 0;
    to_add = 0;
    result = 1;
    segment_size = full;

    for (l in list) {
        segment_size = segment_size/(9-l);
        location_num = map_locations.poems[list[l]].redux_num;
        to_add = (location_num-1)*segment_size;
        result = result + to_add;
    }

    result = Math.floor(result);
    return result;
};



//VARIABLES AND MAP DATA

//Array of locations found for REDUX
redux_found_locations = [];

intro_text = '<p id="intro">Welcome. Please mark locations on the map as visited to begin writing the poem.</p>'

//connecting lines between stanzas
//must end with opening <p> tag or mid-line with a space
connectors = [
    "<p>do you see open arms or shoving hands here</p><p>", 
    "<p>do you misuse this place, the true sign</p><p>of belonging ", 
    "<p>what will today reveal </p><p>about ", 
    "<p>all this wandering, marking space with footfalls</p><p>", 
    "<p>what happened here once still echoes</p><p>", 
    "<p>somehow alien, somehow exactly the same </p><p>as ", 
    "<p>there are those who know it like the pigeons do</p><p>this place ", 
    "<p>everyone you see a stitch in this city</p><p>", 
    "<p>your steps are echoes of thousands, millions in its life</p><p>"
];

var map;

//marking the centre of the map display
var pos = {
    lat: 54.9726540840611,
    lng: -1.6126888625473157
};

var map_zoom = 15;

//Google Maps object for styling map
var map_style = [  {    "elementType": "geometry.fill",    "stylers": [      {        "color": "#ece9de"      }    ]  },  {    "elementType": "labels.icon",    "stylers": [      {        "visibility": "off"      }    ]  },  {    "elementType": "labels.text.fill",    "stylers": [      {        "color": "#000000"      }    ]  },  {    "elementType": "labels.text.stroke",    "stylers": [      {        "visibility": "off"      }    ]  },  {    "featureType": "landscape.man_made",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#c7c7c4"      }    ]  },  {    "featureType": "landscape.man_made",    "elementType": "geometry.stroke",    "stylers": [      {        "color": "#959593"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry",    "stylers": [      {        "color": "#eeeeee"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#9d9a9c"      }    ]  },  {    "featureType": "poi",    "elementType": "geometry.stroke",    "stylers": [      {        "color": "#424143"      }    ]  },  {    "featureType": "poi.attraction",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "poi.park",    "elementType": "geometry",    "stylers": [      {        "color": "#e5e5e5"      }    ]  },  {    "featureType": "poi.park",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#69c65f"      }    ]  },  {    "featureType": "poi.place_of_worship",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "poi.sports_complex",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "road",    "elementType": "geometry",    "stylers": [      {        "color": "#ffffff"      }    ]  },  {    "featureType": "road.highway",    "elementType": "geometry",    "stylers": [      {        "color": "#dadada"      }    ]  },  {    "featureType": "road.highway",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#757575"      }    ]  },  {    "featureType": "transit",    "elementType": "labels.icon",    "stylers": [      {        "visibility": "on"      }    ]  },  {    "featureType": "transit.line",    "elementType": "geometry",    "stylers": [      {        "color": "#626262"      }    ]  },  {    "featureType": "water",    "elementType": "geometry",    "stylers": [      {        "color": "#c9c9c9"      }    ]  },  {    "featureType": "water",    "elementType": "geometry.fill",    "stylers": [      {        "color": "#60caf0"      }    ]  }]


//Object containing the name, co-ordinates and lines for each location
map_locations = {
    venues :
        {/* VENUE MARKERS DISABLED POST-FESTIVAL */},
    poems : 
        {
        BlackGate :
            {
            position:
                {
                lat: 54.968989, 
                lng: -1.611056
                },
            list_id: "BlackGate",
            name: "The Black Gate",
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where wary eyes once looked out </p><p>on the people below</p><p>and this old fortress is dwarfed </p><p>by the city it once overlooked</p>",
            redux_num: 1
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where disrepair sits next to new dreams</p><p>where power shifts, old purposes decay through</p><p>the liquid nature of the place, ever-changing, reinventing</p>",
            redux_num: 2
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where lines converge with a screech of rails</p><p>and journeys change shape</p><p>a city dreaming of itself as another</p>",
            redux_num: 3
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where steps of power are scarred with metal </p><p>as one thin skater kid tumbles in the sun and</p><p>by night the tower glows extraterrestrially </p>",
            redux_num: 4
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where, knowing you, trusting you, </p><p>a place could give you its secrets, reveal </p><p>these dark corners where real history is made</p><p>could speed your journey along</p>",
            redux_num: 5
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where everything and nothing </p><p>is overheard, maelstrom voices</p><p>weekly circuits and the same lunchtime tracks</p><p>feet march out their own routines </p>",
            redux_num: 6
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where we can be Parisian, Milanese</p><p>citizens of anywhere </p><p>under our heat-lamps and electric stars</p><p>importing the most beautiful parts of other worlds</p>",
            redux_num: 7
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where, crossing the water, one city becomes another</p><p>you switch allegiance with a step enabled</p><p>by this bright beam over the river</p>",
            redux_num: 8
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
            poet: "",
            title: "",
            page: "",
            marker: null,
            label: null,
            found: false,
            redux_lines: "where encounters are given, characters erupt into life</p><p>angel, mutant, valkyrie, they are too distant, too fleeting to discern</p><p>and everything serves as a pin in memory, anchoring history</p><p>in the forward flow of so many lives</p>",
            redux_num: 9
            }
        },
    saved: false,
    loaded: false
};

//generating map markers on the interface
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








//DISPLAY FUNCTIONS

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
            if ($("#ncl-poem-text").html() == intro_text) {
                $("#ncl-poem-text").html("");
            }
            $("#ncl-poem-text").append("<p>&nbsp;</p>");
            $("#ncl-poem-text").append(connectors[redux_found_locations.length-1] + map_locations.poems[x].redux_lines);

            $("#poem-number").html("Poem #" + poem_number(redux_found_locations));
        }
    } 
};

//Close all info windows
function close_labels() {
    for (n = 0; n < poem_labels.length; n++) {
        poem_labels[n].label.close();
    }
    for (n = 0; n < venue_labels.length; n++) {
        venue_labels[n].label.close();
    }
}


//main map load function
function load_map() {
    //loading the map
    var mapOptions = {
        center: pos,
        zoom: map_zoom,
        styles: map_style,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //loading the location markers
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
                                "<p><strong>" + 
                                map_locations.poems[poem].name+"</strong></p>"
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
                                "<p><strong>" + 
                                map_locations.poems[poem].name + 
                                "</strong></p>" + 
                                "<p><em>Not visited yet!</em></p>" +
                                "<p><a href='#' class='add-location' id='" + map_locations.poems[poem].list_id + "'>Mark as visited</a></p>"
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

};

//Map reload - fire manually by the reload button or by interface resizing.
function reload_map() {
    save_zoom = map.getZoom();
    save_pos = {"lat": map.center.lat(), "lng":map.center.lng()};
    load_map();
    map.setZoom(save_zoom);
    map.setCenter(save_pos);
}







$(document).ready(function(){

    //Load intro text
    $("#ncl-poem-text").html(intro_text);

    // CLICK EVENTS

    $("#ncl-poem-redo").click(function() {
        if($("#ncl-poem-text").html() != intro_text){
            del = confirm("Erase poem?");
            if (del) {
                $("#ncl-poem-text").html(intro_text);
                $("#poem-number").html("");
                redux_found_locations = [];
                for (x in map_locations.poems) {
                    map_locations.poems[x].found = false;
                }
                load_map();
            }
        } 
    });

    $("#ncl-poem-print").click(function() {
        if($("#ncl-poem-text").html() != intro_text){
            window.print();
        }
    });

    $(".reload-map").click(function(){
        reload_map();
        $(this).removeClass("ui-btn-active");
    });

    $("body").on("click", ".add-location", function() {
        clicked = this;
        for (x in map_locations.poems) {
            if (map_locations.poems[x].list_id == clicked.id) {
                map_locations.poems[x].found = true;
            }
        }
        update_redux_poem();
        reload_map();
    });






    //INITIAL MAP LOAD

    setTimeout(function(){
        load_map()
    },500);
    
});

