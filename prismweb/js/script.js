class Prism{
    constructor(height, radius, dimension, openEnded, color){
        this.height = height;
        this.radius = radius;
        this.dimension = dimension;
        this.openEnded = openEnded;
        this.prismcolor = color;
    }

    buildPrism(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.2, 1000 );
        var renderer = new THREE.WebGLRenderer( {alpha: true} );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        camera.position.z = 3.9;

        var geometry = new THREE.CylinderGeometry(this.radius,this.radius,this.height,this.dimension,1,this.openEnded,0,6.3);

        var material = new THREE.MeshBasicMaterial( {wireframe: false, color: this.prismcolor} );
        var framematerial = new THREE.MeshBasicMaterial( {wireframe: true, color: 0x000000} );

        var frame = new THREE.Mesh( geometry, framematerial);
        var prism = new THREE.Mesh( geometry, material );

        scene.add( frame );
        scene.add( prism );

        function render () {
            requestAnimationFrame(render);

            prism.rotation.y += 0.01;
            prism.rotation.z += 0.01;
            prism.rotation.x += 0.01;

            frame.rotation.y += 0.01;
            frame.rotation.z += 0.01;
            frame.rotation.x += 0.01;



            renderer.render(scene, camera);
        }


        render();




    }
}


function buttonSend(){
    document.getElementById("forma").innerHTML = "";

    var html =
        "<br>"+
        "<div class='alert alert-danger'>"+
        "<h4>Ошибка!</h4>"+
        "<ul>";

    var height = document.getElementById("height").value;
    var radius = document.getElementById("radius").value;
    var dimension = document.getElementById("dimension").value;
    var color = document.getElementById("color").value;
    var openEnded;

    openEnded = document.getElementById("openEndedCheck").checked == true;

    var errorsList = dataCheck();

    if (errorsList.length == 0){
        var prism = new Prism(height, radius, dimension, openEnded, color);
        prism.buildPrism();
    }else{

           var error;
           for (i = 0; i < errorsList.length; i++){
              switch (errorsList[i]){
                  case 1:
                      error = "Значение высоты должно быть в интервале от 0 до 10.";
                      break;
                  case 2:
                      error = "Значение радиуса должно быть в интервале от 0 до 10.";
                      break;
                  case 3:
                      error = "Количество сторон должно быть в интервале от 0 до 64";
                      break;
                  case 4:
                      error = "Недостаточно значений для работы программы.";
                      break;

              }

              html = html + "<li>" + error + "</li>";
           }

           html = html + "</ul></div>";

        document.getElementById("forma").innerHTML += html;


    }


    function dataCheck(){
        var errors = [];
        if (!(height >= 0 && height <= 10)){
            errors.push(1);
        }
        if (!(radius >= 0 && radius <= 10)){
            errors.push(2);
        }
        if (!(dimension >= 0 && dimension <= 64)){
            errors.push(3);
        }
        if (height == "" || radius == "" || dimension == ""){
            errors.push(4);
        }
        return errors;
    }


}




