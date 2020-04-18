const yaml = require('js-yaml');
const fs   = require('fs');

let data = JSON.parse(fs.readFileSync('data.json'));

const organized = {};
Object.keys(data).sort().forEach((key) => {
  organized[key] = data[key];
});
fs.writeFileSync('data.json', JSON.stringify(organized, null, 2));

let result = [];

let calcMaterial = (materials) => {
  let cost = 0;
  for (let name in materials) {
    let material = data[name];
    if (!material) {
      console.log('[material is not found]' + name);
      return undefined;
    }
    if (!material.bell) {
      console.log('[bell is undefined] ' + name );
      return undefined;
    }
    if (material.bell === -1) {
      console.log('[bell is not found] ' + name );
      return undefined;
    }
    if (materials[name].material) {
      let detail = calcMaterial(materials[name].material);
      if (!detail) {
        return undefined;
      }
      cost += detail;
    } else {
      cost += material.bell * materials[name];
    }
  }
  return cost;
};

for (let key in data) {
  let cost = null;
  if (!data[key].bell || data[key].bell === -1) {
    console.log('[bell is not found] ' + key);
  }
  if (data[key].cost) {
    cost = data[key].cost;
  } else {
    cost = calcMaterial(data[key].material);
  }
  if (cost) {
    data[key].cost = cost;
    if (data[key].quantity) {
      data[key].rate = data[key].bell * data[key].quantity / data[key].cost;
    } else {
      data[key].rate = data[key].bell / data[key].cost;
    }
  }
  result.push(Object.assign({
    name: key
  }, data[key]));
}

result.sort((b, a) => {
  if (a.rate && b.rate) {
    if (a.rate > b.rate) {
      return 1;
    } else if (a.rate === b.rate) {
      if (a.bell > b.bell) {
        return 1;
      } else if (a.bell === b.bell) {
        return 0;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  } else if (a.rate) {
    return 1;
  } else if (b.rate) {
    return -1;
  } else {
    if (a.bell > b.bell) {
      return 1;
    } else if (a.bell === b.bell) {
      return 0;
    } else {
      return -1;
    }
  }
});

try {
  fs.writeFileSync('../bell.yml', yaml.dump(result), 'utf8');
} catch (error) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
}

try {
  fs.writeFileSync('../bell.js', 'let jsonData = ' + JSON.stringify(result) + ';', 'utf8');
} catch (error) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
}

console.log('Success!');