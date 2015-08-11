var dump = {
	box: {},
	lines: [],
	fields: [],
	dataStartIndex: 0,
	dataObj: {},
	atoms: []
}

function fileParse(filecontents) {
	dump.lines = filecontents.split('\n');
	findTableHead();
	readData();
	setBoxDims();
}

function findTableHead() {
	var headStartString = 'ITEM: ATOMS ';
	var boxStartString = 'ITEM: BOX ';
	var fields = [];
	for (var i = 0; i < dump.lines.length; i++) {
		if (dump.lines[i].indexOf(headStartString, 0) != -1) {
			fields = dump.lines[i].replace(headStartString, '').split(' ');
			dump.dataStartIndex = i + 1;
		}
		if (dump.lines[i].indexOf(boxStartString, 0) != -1) {
			var line, boxObj;
			var boxDims = ['x', 'y', 'z'];
			for (var j = i + 1; j < i + 4; j++) {
				line = dump.lines[j].split(' ');
				dataLine = [];
				var y = ['lo', 'hi'];
				var z = {};
				for (var k = 0; k < line.length; k++) {
					if (line[k] != '') {
						dataLine.push(line[k]);
					}
				};
				for (var k = 0; k < dataLine.length; k++) {
					z[y[k]] = parseFloat(dataLine[k]);
				};
				dump.box[boxDims[j-i-1]] = z;
			}
		}
	};
	for (var i = 0; i < fields.length; i++) {
		if (fields[i] != '') {
			dump.fields.push(fields[i]);
		}
	};
}

function readData() {
	var line, dataLine;
	var dataKeys = dump.fields;
	var dataObj;
	for (var i = dump.dataStartIndex; i < dump.lines.length; i++) {
		line = dump.lines[i].split(' ');
		dataLine = [];
		dataObj = {};
		for (var j = 0; j < line.length; j++) {
			if (line[j] != '') {
				dataLine.push(line[j]);
			}
		};
		for (var j = 0; j < dataKeys.length; j++) {
			dataObj[dataKeys[j]] = parseFloat(dataLine[j]);
		};
		dump.atoms.push(dataObj);
	}
}

function setBoxDims(){
	dump.box.x.len = dump.box.x.hi - dump.box.x.lo;
	dump.box.y.len = dump.box.y.hi - dump.box.y.lo;
	dump.box.z.len = dump.box.z.hi - dump.box.z.lo;
}