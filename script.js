
document.addEventListener('DOMContentLoaded', () => {
    const colorInputsContainer = document.getElementById('color-inputs');
    const addColorBtn = document.getElementById('add-color');
    const removeColorBtn = document.getElementById('remove-color');
    const gradientTypeRadios = document.querySelectorAll('input[name="gradient-type"]');
    const angleControl = document.getElementById('angle-control');
    const angleSlider = document.getElementById('angle');
    const angleValue = document.getElementById('angle-value');
    const randomGradientBtn = document.getElementById('random-gradient');
    const backgroundPreview = document.querySelector('.background-preview');
    const cssOutput = document.getElementById('css-output');
    const copyCssBtn = document.getElementById('copy-css');
    const downloadImageBtn = document.getElementById('download-image');

    let gradientState = {
        colors: ['#ff8c00', '#ff0080'],
        type: 'linear',
        angle: 90
    };

    function updateGradient() {
        const colors = Array.from(document.querySelectorAll('.color-input')).map(input => input.value);
        gradientState.colors = colors;
        gradientState.type = document.querySelector('input[name="gradient-type"]:checked').value;
        gradientState.angle = angleSlider.value;

        let gradientCss = '';
        if (gradientState.type === 'linear') {
            gradientCss = `linear-gradient(${gradientState.angle}deg, ${gradientState.colors.join(', ')})`;
            angleControl.style.display = 'flex';
        } else {
            gradientCss = `radial-gradient(${gradientState.colors.join(', ')})`;
            angleControl.style.display = 'none';
        }

        backgroundPreview.style.backgroundImage = gradientCss;
        cssOutput.value = `background-image: ${gradientCss};`;
    }

    function addColorInput() {
        if (gradientState.colors.length < 10) {
            const newInput = document.createElement('input');
            newInput.type = 'color';
            newInput.className = 'color-input';
            newInput.value = '#ffffff';
            colorInputsContainer.appendChild(newInput);
            newInput.addEventListener('input', updateGradient);
            updateGradient();
        }
    }

    function removeColorInput() {
        const inputs = document.querySelectorAll('.color-input');
        if (inputs.length > 2) {
            inputs[inputs.length - 1].remove();
            updateGradient();
        }
    }

    function generateRandomGradient() {
        const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        const colorInputs = document.querySelectorAll('.color-input');
        colorInputs.forEach(input => {
            input.value = randomColor();
        });
        angleSlider.value = Math.floor(Math.random() * 361);
        angleValue.textContent = `${angleSlider.value}°`;
        updateGradient();
    }
    
    function copyCss() {
        cssOutput.select();
        document.execCommand('copy');
        copyCssBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyCssBtn.textContent = 'Copy CSS';
        }, 1500);
    }
    
    function downloadImage() {
        alert("Image download functionality is not implemented in this version.");
    }


    document.querySelectorAll('.color-input').forEach(input => {
        input.addEventListener('input', updateGradient);
    });

    addColorBtn.addEventListener('click', addColorInput);
    removeColorBtn.addEventListener('click', removeColorInput);

    gradientTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateGradient);
    });

    angleSlider.addEventListener('input', () => {
        angleValue.textContent = `${angleSlider.value}°`;
        updateGradient();
    });



    randomGradientBtn.addEventListener('click', generateRandomGradient);
    copyCssBtn.addEventListener('click', copyCss);
    downloadImageBtn.addEventListener('click', downloadImage);

    // Initial call
    updateGradient();
});
