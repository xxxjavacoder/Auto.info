$(document).ready(function() {
    $('.intro__slider').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img type="button" src="icons/chevron_right.svg"></button>',
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('#AutoModel').append("" +
        "<option brand='bmw' value='7ser'>7 Series</option>" +
        "<option brand='bmw' value='5ser'>5 Series</option>" +
        "<option brand='bmw' value='m5'>M5</option>" +
        "<option brand='bmw' value='3ser'>3 Series</option>" +
        "<option brand='bmw' value='m3'>M3</option>" +
        "<option brand='bmw' value='x5'>X5</option>" +
        "<option brand='bmw' value='x7'>X7</option>" +
        "<option brand='mb-benz' value='s-class'>S class</option>" +
        "<option brand='mb-benz' value='e-class'>E class</option>" +
        "<option brand='mb-benz' value='c-class'>C class</option>" +
        "<option brand='mb-benz' value='g-class'>G class</option>" +
        "<option brand='mb-benz' value='cls-class'>CLS class</option>" +
        "<option brand='mb-benz' value='cl-class'>CL</option>" +
        "<option brand='porsche' value='panamera'>Panamera</option>" +
        "<option brand='porsche' value='macan'>Macan</option>" +
        "<option brand='porsche' value='cayenne'>Cayenne</option>" +
        "<option brand='audi' value='a8'>A8</option>" +
        "<option brand='audi' value='a7'>A7</option>" +
        "<option brand='audi' value='a6'>A6</option>" +
        "<option brand='audi' value='a4'>A4</option>" +
        "<option brand='chevy' value='impala'>Impala</option>" +
        "<option brand='chevy' value='camaro'>Camaro</option>" +
        "");

    $('select#AutoBrand').change( function() {
        let auto_brand = $('select#AutoBrand option:checked').val();

        $('#AutoModel').removeAttr('disabled');

        if(auto_brand === 'bmw') {

            $("option[brand = 'bmw']").removeAttr('style');
            $("option[brand = 'mb-benz']").css({'display':'none'});
            $("option[brand = 'porsche']").css({'display':'none'});
            $("option[brand = 'audi']").css({'display':'none'});
            $("option[brand = 'chevy']").css({'display':'none'});

        } else if (auto_brand === 'mb-benz') {

            $("option[brand = 'mb-benz']").removeAttr('style');
            $("option[brand = 'bmw']").css({'display':'none'});
            $("option[brand = 'porsche']").css({'display':'none'});
            $("option[brand = 'audi']").css({'display':'none'});
            $("option[brand = 'chevy']").css({'display':'none'});

        } else if (auto_brand === 'porsche') {

            $("option[brand = 'porsche']").removeAttr('style');
            $("option[brand = 'bmw']").css({'display':'none'});
            $("option[brand = 'mb-benz']").css({'display':'none'});
            $("option[brand = 'audi']").css({'display':'none'});
            $("option[brand = 'chevy']").css({'display':'none'});

        } else if (auto_brand === 'audi') {

            $("option[brand = 'audi']").removeAttr('style');
            $("option[brand = 'bmw']").css({'display':'none'});
            $("option[brand = 'mb-benz']").css({'display':'none'});
            $("option[brand = 'porsche']").css({'display':'none'});
            $("option[brand = 'chevy']").css({'display':'none'});

        } else if (auto_brand === 'chevy') {

            $("option[brand = 'chevy']").removeAttr('style');
            $("option[brand = 'bmw']").css({'display':'none'});
            $("option[brand = 'mb-benz']").css({'display':'none'});
            $("option[brand = 'audi']").css({'display':'none'});
            $("option[brand = 'porsche']").css({'display':'none'});

        }
    })
});

window.addEventListener('DOMContentLoaded', () => {

    function getData() {

        getRessource("http://localhost:3000/automobiles")
            .then(data => AddInfo(data))
            .catch(err => console.error(err));
    }

    async function getRessource(url) {
        const result = await fetch(`${url}`);

        if(!result.ok) {
            throw new Error(`Can't fetch ${url} endpoint. status: ${result.status}`)
        } else {

        }

        return await result.json();
    }

    function checkAuto(automobiles) {
        let brand = $("#AutoBrand").val();
        let model = $("#AutoModel").val();

        if(automobiles.name === brand && automobiles.model === model){
            return automobiles;
        }
    }

    function AddInfo(data) {
        document.getElementById('AutoResult').innerHTML = "";


        let response = document.createElement('div');
        let automobile = data.find(checkAuto);

        if(!automobile) {
            response.innerHTML = `
                <p>
                    Наразі ми не маємо достатньо інформації про даний автомобіль, але ми працюємо над цим!
                </p>
            `;

            document.querySelector("#AutoResult").appendChild(response);
        }

        response.innerHTML = `
                       <p>${automobile.text}</p>
                   `;

        document.querySelector("#AutoResult").appendChild(response);
    }

    document.querySelector('#js-submit-form').addEventListener('click', getData);
});
