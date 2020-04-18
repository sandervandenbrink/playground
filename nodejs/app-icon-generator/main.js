const Jimp = require("jimp");

const envs = ['acceptance', 'dev', 'integration', 'loadtest', 'staging'];
const sizes = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];

const generateForEnv = (env) => {
  console.log('Generate for env', env);

  sizes.forEach((size) => {
    const iconImagePath = `./assets/icons/${size}.png`;
    const envImagePath = `./assets/templates/${env}/${size}.png`;
    const outputPath = `./output/${env}/${size}.png`;

    Jimp.read(iconImagePath, (err, iconImage) => {
      if (err) {
        console.error('Image read failed', err);
        return;
      }

      Jimp.read(envImagePath, (err, envImage) => {
        if (err) {
          console.error('Image read failed', err);
          return;
        }

        iconImage.composite(envImage, 0, 0);
        iconImage.write(outputPath, () => {
          console.log('Write done for', outputPath);
        });
      });
    });
  });
}

const generate = () => {
  envs.forEach((env) => {
    generateForEnv(env);
  });
}

// Start
generate();
