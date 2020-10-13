
var deviceType = 'camera', manufacturer = 'arri', product = '', filteredData = [];

console.log(cableData)

const filterData = function() {
    filteredData = [];
    cableData.connectorA.forEach(item => {
        if (lower(item.type) === lower(deviceType) && lower(item.Manufacturer) === lower(manufacturer)) {
            filteredData.push(item);
        }
    });
    cableData.connectorB.forEach(item => {
        if (lower(item.type) === lower(deviceType) && lower(item.Manufacturer) === lower(manufacturer)) {
            filteredData.push(item);
        }
    });
    console.log(filteredData.length);
}

const lower = function (str){
    return str.toUpperCase();
}

const getProductId = function(productName) {
    return productName.split(' ').join('-');
}

const fixFileName = function (productName) {
    return productName.replace("+", "-").replace(":", "-").replace("/", "-");
}

const getProductHtml = function() {
    let body = `
        <h5 class="bd-wizard-step-title">Step 3</h5>
        <h2 class="section-heading mb-5">The Camera is a…</h2>
        <div class="purpose-radios-wrapper">
    `;
    filteredData.forEach((item, inx) => {
        let deviceImageName = `${fixFileName(item.Product)}.png`;
        const productId = getProductId(item.Product);
        const checked = (inx === 0) ? 'checked': '';
        body += `
            <div class="purpose-radio">
                <input type="radio" name="products" id="${productId}" class="choose-manufacturer purpose-radio-input" value="${productId}" ${checked}>
                <label for="${productId}" class="purpose-radio-label">
                <span class="label-icon">
                  <img src="assets/images/devices/${deviceType}/${manufacturer}/${deviceImageName}" alt="no-Image" class="select-img">
                </span>
                <span class="label-text">${item.Product}</span>
                </label>
              </div>
        `;
    })

    body += `
        </div>
    `;

    return body;
}

var steps = $("#wizard").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "fade",
    stepsOrientation: "vertical",
    titleTemplate: '<span class="number">#index#</span>',
    onStepChanging: function (event, currentIndex, newIndex) {
        filterData();
        const idStr = `wizard-p-${newIndex}`;
        if (newIndex === 2) {
            const section = $(`#${idStr}`);
            section.html(getProductHtml());
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

