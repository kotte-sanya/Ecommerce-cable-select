var bdi = {
    deviceType: 'camera',
    manufacturer : 'arri',
    product : '',
    connectorA: 'straight',
    connectorAPrice: '',
    connectorAModel:'',
    powerType: 'steadicam',
    powerManufacturer: 'tiffen',
    powerProduct:'m-1',
    connectorB: 'straight2',
    connectorBPrice: '',
    connectorBModel:'',
    cableType:'short-coiled',
    cableLength: 30
}
var filteredDataA = [], filteredDataB = [];

const filterData = function() {
    filteredDataA = [];
    filteredDataB = [];
    cableData.connectorA.forEach(item => {
        if (lower(item.type) === lower(bdi.deviceType) && lower(item.Manufacturer) === lower(bdi.manufacturer)) {
            filteredDataA.push(item);
        }
    });
    cableData.connectorB.forEach(item => {
        if (lower(item.type) === lower(bdi.powerType) && lower(item.Manufacturer) === lower(bdi.powerManufacturer)) {
            filteredDataB.push(item);
        }
    });
}

const lower = function (str){
    return str.toUpperCase();
}

const getProductId = function(productName) {
    return productName.split(' ').join('-');
}

const fixFileName = function (productName) {
    return productName.replace("+", "-").replace(":", "-").replace("/", "-").toLowerCase();
}

const getProductHtml = function() {
    let body = `
        <h5 class="bd-wizard-step-title">Step 3</h5>
        <h2 class="section-heading mb-5">The Camera is a…</h2>
        <div class="purpose-radios-wrapper">
    `;
    filteredDataA.forEach((item, inx) => {
        let deviceImageName = `${fixFileName(item.Product)}.png`;
        const productId = getProductId(item.Product);
        const checked = (inx === 0) ? 'checked': '';
        if(inx === 0) {
            bdi.product = item.Product;
        }
        body += `
            <div class="purpose-radio">
                <input type="radio" name="products" id="${productId}" class="choose-product purpose-radio-input" value="${item.Product}" ${checked}>
                <label for="${productId}" class="purpose-radio-label">
                <span class="label-icon">
                  <img src="assets/device-images/${bdi.deviceType}/${bdi.manufacturer}/${deviceImageName}" alt="no-Image" class="select-img">
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

const getPowerProductHtml = function() {
    let body = `
        <h5 class="bd-wizard-step-title">Step 7</h5>
        <h2 class="section-heading mb-5">I need to plug into a….</h2>
        <div class="purpose-radios-wrapper">
    `;

    filteredDataB.forEach((item, inx) => {
        let deviceImageName = `${fixFileName(item.Product)}.png`;
        let imagePath = '';

        if(bdi.powerType === 'monitor') {
            imagePath = `assets/device-images/monitor/${bdi.powerManufacturer}/${deviceImageName}`;
        } else {
            imagePath = `assets/device-images/power/${bdi.powerManufacturer}/${deviceImageName}`;
        }
        const productId = getProductId(item.Product);
        const checked = (inx === 0) ? 'checked': '';
        if(inx === 0) {
            bdi.powerProduct = item.Product;
        }
        body += `
            <div class="purpose-radio">
                <input type="radio" name="products" id="${productId}" class="choose-powerProduct purpose-radio-input" value="${item.Product}" ${checked}>
                <label for="${productId}" class="purpose-radio-label">
                <span class="label-icon">
                  <img src="${imagePath}" alt="no-Image" class="select-img">
                </span>
                <span class="label-text">${item.Product}</span>
                </label>
            </div>
        `;
    })
    body += `</div>`;

    return body;
}

const getFinishHtml = function() {
    let body = `
        <h5 class="bd-wizard-step-title">Step 10</h5>
        <h2 class="section-heading mb-5">Your Finished Cable</h2>
        <div class="purpose-radios-wrapper">
    `;

    if (bdi.connectorA === 'straight') {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/04-connector/01-Straight Lemo.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">${bdi.connectorAModel}</span>
            </label>
        </div>
        `;
    } else {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/04-connector/02-Angled Lemo.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">${bdi.connectorAModel}</span>
            </label>
        </div>
        `
    }

    if (bdi.cableType === 'short-coiled') {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/09-type of cable would you like/01-Short Coiled 45cm to 90cm.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">Short Coiled<br>45cm to 90cm</span>
            </label>
        </div>
        `;
    } else if(bdi.cableType === 'straight-cable'){
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/09-type of cable would you like/02-Straight Cable.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">Straight Cable <br> ${bdi.cableLength}cm</span>
            </label>
        </div>
        `
    } else {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/09-type of cable would you like/03-Long coiled 0.9m to 2.5m.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">Long coiled<br>0.9m to 2.5m</span>
            </label>
        </div>
        `
    }

    if (bdi.connectorB === 'straight2') {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/08-connector 3Pin2B Lemo/03-Straight Lemo.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">${bdi.connectorBModel}</span>
            </label>
        </div>
        `;
    } else {
        body += `
        <div class="purpose-radio">
            <label class="purpose-radio-label">
            <span class="label-icon">
                <img src="assets/images/08-connector 3Pin2B Lemo/04-Angled Lemo.png" alt="branding" class="select-img">
            </span>
            <span class="label-text">${bdi.connectorBModel}</span>
            </label>
        </div>
        `
    }
    body += `
        </div>
        <h2 class="section-heading mt-5">Total Cost - £160</h2>
        <div style="text-align: center;"><button type="button" class="btn btn-warning btn-lg">Add to Cart <i class='fas fa-shopping-cart'></i></button></div>
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
        
        if (newIndex === 1) { // select manufacturer
            $("#step2-title").text(`It is a ${bdi.deviceType} made by….`);
        }
        if (newIndex === 2) { // select product
            $("#step3-title").text(`The ${bdi.deviceType} is a…`);
            $(`#${idStr}`).html(getProductHtml());
            
            $('.choose-product').on('change', function(e) {
                bdi.product = e.target.value;
            });
            if(filteredDataA.length === 0) {alert("There are no matched devices. Try again.");return false};
        }
        if (newIndex === 3) { // select connectorA
            let isThereAngled = true;

            filteredDataA.forEach(item => {
                if (item.Product === bdi.product) {
                    bdi.connectorAModel = item.Connector[0].model;
                    if(item.Connector[0].Angled === 'N/A') isThereAngled = false;
                }
            })
            $("#connectorA-type").text(`It’s an ${bdi.connectorAModel}`);

            if (!isThereAngled) {
                $("#angled").hide();
                $("#angled").next().hide();
                $("#angled").next().next().hide();
            } else {
                $("#angled").show();
                $("#angled").next().show();
                $("#angled").next().next().show();
            }
        }
        if (newIndex === 4) { // select powerType

        }
        if (newIndex === 5) { // select power manufacturer

        }
        if (newIndex === 6) { // select power product
            $(`#${idStr}`).html(getPowerProductHtml());

            $('.choose-powerProduct').on('change', function(e) {
                bdi.powerProduct = e.target.value;
            });
            if(filteredDataB.length === 0)  {alert("There are no matched devices. Try again."); return false};
        }
        if (newIndex === 7) { // select connectorB
            let isThereAngled = true;
            
            filteredDataB.forEach(item => {
                if (item.Product === bdi.powerProduct) {
                    bdi.connectorBModel = item.Connector[0].model;
                    if(item.Connector[0].Angled === 'N/A') isThereAngled = false;
                }
            })
            $("#connectorB-type").text(`It’s an ${bdi.connectorBModel}`);
            if (!isThereAngled) {
                $("#angled2").hide();
                $("#angled2").next().hide();
                $("#angled2").next().next().hide();
            } else {
                $("#angled2").show();
                $("#angled2").next().show();
                $("#angled2").next().next().show();
            }
        }
        if (newIndex === 8) { // select cable

        }
        if (newIndex === 9) { // finish
            $(`#${idStr}`).html(getFinishHtml());
        }
        console.log(bdi)
        return true;
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        if(priorIndex > currentIndex) {
            $theSteps = $('.steps ul').find('.current');
            let index = $theSteps.index();
            $($theSteps).parent().children().each((i, d) => {
                if (i > index) {
                    $(d).removeClass('done')._enableAria(false)
                }
            })
            // $($theSteps).next('li').removeClass('done')._enableAria(false);
        }
        
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
    bdi.deviceType = e.target.value;
});
$('.choose-manufacturer').on('change', function(e) {
    bdi.manufacturer = e.target.value;
});



$('.choose-connectorA').on('change', function(e) {
    bdi.connectorA = e.target.value;
    console.log(bdi.connectorA)
});
$('.choose-power').on('change', function(e) {
    bdi.powerType = e.target.value;
});
$('.choose-powerManufacturer').on('change', function(e) {
    bdi.powerManufacturer = e.target.value;
});
$('.choose-connectB').on('change', function(e) {
    bdi.connectorB = e.target.value;
});
$('.choose-cableType').on('change', function(e) {
    bdi.cableType = e.target.value;
});
$('#select-cable-length').on('change', function(e) {
    bdi.cableLength = e.target.value;
});
