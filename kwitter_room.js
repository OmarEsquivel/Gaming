const firebaseConfig = {
  apiKey: "AIzaSyApB6S19uvy-fdhdNl8C_olCwBQ9hpm9ds",
  authDomain: "gaming-b671a.firebaseapp.com",
  databaseURL: "https://gaming-b671a-default-rtdb.firebaseio.com",
  projectId: "gaming-b671a",
  storageBucket: "gaming-b671a.appspot.com",
  messagingSenderId: "262508790663",
  appId: "1:262508790663:web:ee4164b80dbc0f91c58922"
};
    
    firebase.initializeApp(firebaseConfig);


    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
    
    
    document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";
    
    
    function addRoom() {
      room_name = document.getElementById("room_name").value;
    
    
      firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
      });
    
    
      localStorage.setItem("room_name", room_name);
      window.location.replace("kwitter_page.html");
    }
    
    
    function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
          childKey = childSnapshot.key;
          childData = childSnapshot.val();
          if (childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;

            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button = "<button class='btn btn-warning' id=" + firebase_message_id +  " value=" + like + " onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like +
            "</span></button><hr>";
            row = name_with_tag + message_with_tag + like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
          }
          
          Room_names = childKey
          console.log("Nombre de la sala -" + Room_names);
          row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName (this.id)'># "+Room_names+" </div><hr>"
          document.getElementById("output").innerHTML += row;
        });
      });
    }
    getData();
    
    
    
    
    function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
    }
    function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
    }
    