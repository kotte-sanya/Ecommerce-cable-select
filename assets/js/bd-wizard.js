
var deviceType = '', manufacturer = '', product = '';

console.log(cableData)

const filterData = function() {
    
}

const getProductHtml = function() {
    let body = '';


    return body;
}

var steps = $("#wizard").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "fade",
    stepsOrientation: "vertical",
    titleTemplate: '<span class="number">#index#</span>',
    onStepChanging: function (event, currentIndex, newIndex) {
        // console.log(event, currentIndex, newIndex)
        const idStr = `wizard-p-${newIndex}`;
        if (newIndex === 2) {
            const section = $(`#${idStr}`);
            console.log(newIndex)
        }
        return true;
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        // console.log(event, currentIndex, priorIndex)
        return true;
    },
    onFinishing: function (event, currentIndex)
    {
        console.log(event, currentIndex)
        return true;
    },
    onFinished: function (event, currentIndex)
    {
        console.log(event, currentIndex)
        return true;
    }
});


$('.choose-device').on('change', function(e) {
    deviceType = e.target.value;
});
$('.choose-manufacturer').on('change', function(e) {
    manufacturer = e.target.value;
});

// $('#firstName').on('change', function(e) {
//     $('#enteredFirstName').text(e.target.value || 'Cha');
// });

// $('#lastName').on('change', function(e) {
//     $('#enteredLastName').text(e.target.value || 'Ji-Hun C');
// });

// $('#phoneNumber').on('change', function(e) {
//     $('#enteredPhoneNumber').text(e.target.value || '+230-582-6609');
// });

// $('#emailAddress').on('change', function(e) {
//     $('#enteredEmailAddress').text(e.target.value || 'willms_abby@gmail.com');
// });

