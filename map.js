// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const data = [];

var map;
var infowindow;
let service;

function initMap() {
  //var pyrmont = {lat: -33.867, lng: 151.195}; //Default
  //var pyrmont = {lat: 13.08268, lng:  80.270718}; //Chennai, India
  //var pyrmont = {lat: 43.653226, lng:  -79.383184}; //Toronto, ON
  var pyrmont = {lat: 43.588864, lng:  -79.660531}; //Missisauga, ON
  //var pyrmont = {lat: 43.8509, lng:  -79.0204};//Ajax
  //var pyrmont = {lat: 43.998550, lng:  -79.678200};//Clarington
  //var pyrmont = {lat: 44.280450, lng:  -79.109160};//Brock
  //var pyrmont = {lat: 43.896080, lng:  -78.865130};//Oshawa

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 11
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location: pyrmont,
    radius: 500,
    query: 'yoga'
  }, callback);
  console.log(data);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      printContacts(results[i], i);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function printContacts(place, num) {
  if (place.place_id !== null) {
    var request = { placeId: place.place_id };
    service.getDetails(request, function(details, status) {
      if (details !== null) {
        //console.log(details);
        let mapObj = {};
        mapObj.name = details.name;
        //mapObj.image = "https://iamyoga.ca/wp-content/uploads/2017/04/studio-experience.jpg";
;        mapObj.image = typeof details.photos !== 'undefined' 
         ? details.photos[0].getUrl({'maxWidth': 1024, 'maxHeight': 1024})
         : ''; //alternative a "nophoto.jpg"
        mapObj.rating = details.rating;
        mapObj.website = details.website;
        mapObj.phone = details.formatted_phone_number;//"(416) 792-2211";
        //console.log(details.reviews);
        if (details.reviews !== undefined) {
          mapObj.description = details.reviews["0"].text;
        } else {
          mapObj.description = "Yoga Studio";
        }
        //"12+ styles from stretchy to sweaty,  heated and non-heated,  for all levels of practice.";
        
        if (num % 9 == 0) { 
          mapObj.amenities = [];
          mapObj.amenities.push("Parking");
          mapObj.amenities.push("Locker");
          mapObj.amenities.push("Smoothie Bar");

          mapObj.author = [];
          mapObj.author.push({});
          mapObj.author[0]['id'] = "5bcb00d9720bbf38b66036e4";
          mapObj.author.push({});
          mapObj.author[1]['username'] = "Alice";
        } else if (num % 3 == 0) { 
          mapObj.amenities = [];
          mapObj.amenities.push("Parking");
          mapObj.amenities.push("Locker");
          mapObj.amenities.push("Wifi");

          mapObj.author = [];
          mapObj.author.push({});
          mapObj.author[0]['id'] = "5bcb00d9720bbf38b66036e5";
          mapObj.author.push({});
          mapObj.author[1]['username'] = "Alex";
        } else if (num % 5 == 0) { 
          mapObj.amenities = [];
          mapObj.amenities.push("Parking");
          mapObj.amenities.push("Shower");
          mapObj.amenities.push("Locker");
          mapObj.amenities.push("Wifi");

          mapObj.author = [];
          mapObj.author.push({});
          mapObj.author[0]['id'] = "5bcb00d9720bbf38b66036e6";
          mapObj.author.push({});
          mapObj.author[1]['username'] = "Mike";
        } else { 
          mapObj.amenities = [];
          mapObj.amenities.push("Wifi");
          mapObj.amenities.push("Locker");
          mapObj.amenities.push("Smoothie Bar");

          mapObj.author = [];
          mapObj.author.push({});
          mapObj.author[0]['id'] = "5bcb00d9720bbf38b66036e7";
          mapObj.author.push({});
          mapObj.author[1]['username'] = "Jessica";
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
          mapObj.cost = [12];
        } else if (num % 3 == 0) { 
          mapObj.cost = [20];
        } else if (num % 5 == 0) { 
          mapObj.cost = [30];
        } else { 
          mapObj.cost = [10];
        }
       
        //mapObj.cost = details.price_level;
        mapObj.location = details.vicinity; //details.vicinityformatted_address;
        mapObj.lat = details.geometry.location.lat();
        mapObj.lng = details.geometry.location.lng();
        /*
        mapObj.comments = [];
        mapObj.comments.push({});
        if (details.reviews !== undefined) {
          mapObj.comments[0]["text"] = details.reviews["1"].text;
          mapObj.comments[0]["rating"] = details.reviews["1"].rating;
        } else {
          mapObj.comments[0]["text"] = "This is good place."
          mapObj.comments[0]["rating"] = 4;
        }
        mapObj.comments[0].author = []
        mapObj.comments[0].author.push({});
        mapObj.comments[0].author[0]["id"] = "5bcb00d9720bbf38b66036e4"; 
        mapObj.comments[0].author[0]["username"] = "Alice";
        */
        //console.log(mapObj);
        data.push(mapObj);
        //console.log('data: ' + data);
      }
    });
  }
}


function RetrievePhotoUrlsFromPlace(place) {

    var photos = place.photos;
    var urls = []; // we will store the urls here

    photos.forEach((photo) => {
      urls.push(photo.getUrl({
        maxWidht: 500, // at least set one or the other - mandatory
        maxHeight: undefined
      }));
    });
    console.log(urls);
    /* You have your URLs here !! */
}