const data = [];

let map;
let infowindow;
let service;
let geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  let address = "Oakville";
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.653226, lng:  -79.383184},
    zoom: 11
  });
    codeAddress(address);
}

function codeAddress(address) 
{
  geocoder.geocode( {address:address}, function(results, status) 
  {
    console.log('status: ' + status);
    if (status == google.maps.GeocoderStatus.OK) 
    {
      console.log('location & latlng: ' + address + ' ' + results[0].geometry.location);
      map.setCenter(results[0].geometry.location);//center the map over the result
      infowindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);
      service.textSearch({
        location: results[0].geometry.location,
        radius: 500,
        query: 'yoga'
      }, callback);
      console.log(data);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
      return null;
    }
  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      printContacts(results[i], i);
    }
  }
}

function createMarker(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

let imageURL;

function printContacts(place, num) {
  if (place.place_id !== null) {
    let request = {
      placeId: place.place_id
    };
    service.getDetails(request, function (details, status) {
      if (details !== null) {
        //console.log(details);
        imageURL = typeof details.photos !== 'undefined' ?
          details.photos[0].getUrl({
            'maxWidth': 1024,
            'maxHeight': 1024
          }) :
          'https://images.pexels.com/photos/374101/pexels-photo-374101.jpeg';
        let xhr = new XMLHttpRequest();
        $.ajax({
          type: 'GET',
          xhr: function () {
            return xhr;
          },
          url: imageURL,
          success: function () {
            let mapObj = {};
            mapObj.name = details.name;
            mapObj.image = xhr.responseURL;
            if (details.reviews !== undefined) {
              mapObj.rating = details.rating;
            } else {
              mapObj.rating = 4;
            }
            if (details.reviews !== undefined) {
              mapObj.website = details.website;
            } else {
              mapObj.website = "http://sampleyogastudio.com";
            }
            mapObj.phone = details.formatted_phone_number;
            if (details.reviews !== undefined) {
              mapObj.description = details.reviews["0"].text;
            } else {
              mapObj.description = "This is a good yoga studio! 12+ styles from stretchy to sweaty,  heated and non-heated, for all levels of practice.";
            }

            if (num % 9 == 0) {
              mapObj.amenities = [];
              mapObj.amenities.push("Parking");
              mapObj.amenities.push("Locker");
              mapObj.amenities.push("Smoothie Bar");

              mapObj.author = {
                id: "5bd5ec87075c5c1909b7d6d5",
                username: "Priyanka"
              };
            } else if (num % 3 == 0) {
              mapObj.amenities = [];
              mapObj.amenities.push("Parking");
              mapObj.amenities.push("Locker");
              mapObj.amenities.push("Wifi");

              mapObj.author = {
                id: "5bd5eccd075c5c1909b7d6d6",
                username: "Alice"
              };
            } else if (num % 5 == 0) {
              mapObj.amenities = [];
              mapObj.amenities.push("Parking");
              mapObj.amenities.push("Shower");
              mapObj.amenities.push("Locker");
              mapObj.amenities.push("Wifi");

              mapObj.author = {
                id: "5bd5ed2c075c5c1909b7d6d7",
                username: "Deepika"
              };
            } else {
              mapObj.amenities = [];
              mapObj.amenities.push("Wifi");
              mapObj.amenities.push("Locker");
              mapObj.amenities.push("Smoothie Bar");

              mapObj.author = {
                id: "5bd5ed82075c5c1909b7d6d8",
                username: "Lucia"
              };
            }

            if (num % 10 == 0) {
              mapObj.classes = [];
              mapObj.classes.push("Hatha Yoga");
              mapObj.classes.push("Hot Yoga");
              mapObj.classes.push("Vinyasa Yoga");
            } else if (num % 2 == 0) {
              mapObj.classes = [];
              mapObj.classes.push("Hatha Yoga");
              mapObj.classes.push("Bikram Yoga");
              mapObj.classes.push("Vinyasa Yoga");
            } else if (num % 5 == 0) {
              mapObj.classes = [];
              mapObj.classes.push("Hatha Yoga");
              mapObj.classes.push("Hot Yoga");
              mapObj.classes.push("Prenatal Yoga");
            } else {
              mapObj.classes = [];
              mapObj.classes.push("Hot Yoga");
              mapObj.classes.push("Bikram Yoga");
              mapObj.classes.push("Vinyasa Yoga");
            }

            if (num % 10 == 0) {
              mapObj.beginners = ["Yes"];
            } else if (num % 3 == 0) {
              mapObj.beginners = ["No"];
            } else if (num % 4 == 0) {
              mapObj.beginners = ["Yes"];
            } else {
              mapObj.beginners = ["No"];
            }

            if (num % 10 == 0) {
              mapObj.cost = 12;
            } else if (num % 3 == 0) {
              mapObj.cost = 20;
            } else if (num % 5 == 0) {
              mapObj.cost = 30;
            } else {
              mapObj.cost = 10;
            }

            mapObj.location = details.vicinity; //formatted_address;
            mapObj.lat = details.geometry.location.lat();
            mapObj.lng = details.geometry.location.lng();

            if (details.reviews !== undefined) {
              mapObj.commentfeed = [];
              for (let i = 0; i < details.reviews.length - 1; i++) {
                mapObj.commentfeed.push({});
                mapObj.commentfeed[i]['text'] = details.reviews[i + 1].text;
                mapObj.commentfeed[i]['rating'] = details.reviews[i + 1].rating;
                mapObj.commentfeed[i]['usernamefeed'] = details.reviews[i + 1].author_name;
              }
            } else {
              mapObj.commentfeed = [];
              mapObj.commentfeed.push({});
              mapObj.commentfeed[0]['text'] = "This is good yoga studio. I love it!"
              mapObj.commentfeed[0]['rating'] = 4;
              mapObj.commentfeed[0]['usernamefeed'] = "Alex Parrish";
            }
            data.push(mapObj);
          }
        })
      }
    });
  }
}