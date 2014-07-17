var $ = function( id ) { return document.getElementById( id ); };

function sanitycheck(prefix){
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	var flag = true;

	$('iStr').style['background-color'] = '';
	if (+$('iStr').value > 32500 || +$('iStr').value < 0){
		$('iStr').style['background-color'] = 'red';
		flag = false;
	}
	
	$('iAgi').style['background-color'] = '';
	if (+$('iAgi').value > 32500 || +$('iAgi').value < 0){
		$('iAgi').style['background-color'] = 'red';
		flag = false;
	}

	$('iVit').style['background-color'] = '';
	if (+$('iVit').value > 32500 || +$('iVit').value < 0){
		$('iVit').style['background-color'] = 'red';
		flag = false;
	}

	$('iEne').style['background-color'] = '';
	if (+$('iEne').value > 32500 || +$('iEne').value < 0){
		$('iEne').style['background-color'] = 'red';
		flag = false;
	}

	$('iLevel').style['background-color'] = '';
	if (+$('iLevel').value > 400 || +$('iLevel').value < 1){
		$('iLevel').style['background-color'] = 'red';
		flag = false;
	}

	$('iResets').style['background-color'] = '';
	if (+$('iResets').value > 500 || +$('iResets').value < 0){
		$('iResets').style['background-color'] = 'red';
		flag = false;
	}

	return flag;
}

function addTab(){
	var newTabID = $('tabs').getElementsByTagName('section').length - 1;
	newTabID = 'tab' + (newTabID+1);
	var tabs = $("tabs");
	var newTab = document.createElement("section");
	newTab.id = newTabID;
	var aux = "";
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 2:
		aux = $('modelSM').innerHTML;
		break;
		case 3:
		aux = $('modelME').innerHTML;
		break;
		case 4:
		aux = $('modelMG').innerHTML;
		break;
		default:
		alert('Classe não implementada');
		return;
	}
	newTab.innerHTML = aux;
	tabs.appendChild(newTab);
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 2:
		$(newTabID).classList.add('sm');
		break;
		case 3:
		$(newTabID).classList.add('me');
		break;
		case 4:
		$(newTabID).classList.add('mg');
		break;
		default:
		alert('Classe não implementada');
		return;
	}
	
	$(newTabID).getElementsByTagName('a')[0].href = '#'+ newTabID; 

	var matches = [];
	var elements = $(newTabID).getElementsByTagName('input');
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].id != 'undefined') {
			elements[i].id = newTabID + '_' + elements[i].id;
		}
	}

	var elements = $(newTabID).getElementsByTagName('select');
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].id != 'undefined') {
			elements[i].id = newTabID + '_' + elements[i].id;
		}
	}
	window.location.href = '#'+ newTabID;
}

function refreshSM(e){
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addstaff = +$('iSCStaff').checked;
	var addpendant = +$('iSCPendant').checked;
	var dmgbuff = 0;
	var defbuff = 0;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
	}
	var sample = +$('iSampledmg').value;
	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}
	var pontos = 100 + (280 * reset) + (exreset * 12) + (6 * (lvl-1)) - (str+agi+vit+ene);

	var iatasa = 0;
	var Tiatasa = 0;
	var idfasa = 0;
	var Tidfasa = 0;
	var absasa = 0;
	var Tabsasa = 0;

	switch(tasa){

		case 1:
		Tiatasa = 2;
		Tidfasa = 3;
		Tabsasa = 2;
		iatasa = 12;
		idfasa = 10;
		absasa = 12;
		speed += 15;
		break;

		case 2:
		Tiatasa = 1;
		Tidfasa = 2;
		Tabsasa = 1;
		iatasa = 32;
		idfasa = 45;
		absasa = 25;
		speed += 16;
		break;
	}

	iatasa += (Tiatasa * lasa); iatasa /= 100;
	absasa += (Tabsasa * lasa); absasa /= 100;

	var hp = 30+(lvl-1)+(vit*2);

	for (var i = 0; i < pvida; i++) {
		hp = (hp*1.05) | 0;
	}

	var mp = (lvl-1)*2+ene*2;
	var ag = ((ene*0.2)+(vit*0.3)+(agi*0.4)+(str*0.2)) | 0 ;

	var def = (agi/4); def |= 0;
	def += defbuff;
	def += (Tidfasa * lasa);
	sample -= def;
	sample = sample * (1-absasa) ; sample |= 0;

	for (var i = 0; i < pdimi; i++) {
		sample = (sample*0.96) | 0;
	}
	for (var i = 0; i < pddi; i++) {
		sample = (sample*0.93) | 0;
	}
	if(sample < 0) sample = 0;

	var speed = (agi/10) | 0;
	var sd = ((str+agi+vit+ene) * 1.2 + def / 2 + lvl*lvl/ 30) | 0;
	
	var mindmg = (ene / 9) * (1+(addpendant*0.02)) * (1+(addstaff*0.02)) * (1+staff);
	mindmg += dmgbuff;
	mindmg *= (1+iatasa) * (1+(imp*0.3));
	mindmg |= 0;

	var maxdmg = (ene / 4) * (1+(addpendant*0.02)) * (1+(addstaff*0.02)) * (1+staff);
	maxdmg += dmgbuff;
	maxdmg *= (1+iatasa) * (1+(imp*0.3));
	maxdmg |= 0;

	var excdmg = maxdmg * 1.20; excdmg |= 0;
	var pvmdr = (agi/3) | 0;
	var pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
	var pvpdr = (lvl*2+agi*0.25) | 0;
	var pvpar = (lvl*3+agi*4) | 0;

	for (var i = 0; i < ppvm; i++) {
		pvmdr = (pvmdr * 1.10) | 0;
	}

	$('oPontos').value = pontos;
	$('oMinDmg').value = mindmg;
	$('oMaxDmg').value = maxdmg;
	$('oExcDmg').value = excdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = pvmdr;
	$('oPvmAr').value = pvmar;
	$('oPvpDr').value = pvpdr;
	$('oPvpAr').value = pvpar;
}

function refreshME(e){
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	if (+$('iSCSelf').checked == 1){
		$('iBuffME').value = $('iEne').value;
		$('iBuffME').disabled = true;
	}else{
		$('iBuffME').value = 0;
		$('iBuffME').disabled = false;
	}
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var bowmin = 0;
	var bowmax = 0;
	if(+$('iSBowmin').value > 0)
		bowmin = +$('iSBowmin').value;
	if(+$('iSBowmax').value > 0)
		bowmax = +$('iSBowmax').value;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addbow = +$('iSCBow').checked;
	var addpendant = +$('iSCPendant').checked;	
	var dmgbuff = 0;
	var defbuff = 0;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
		
	}		
	var red = ((ene/7)+3) | 0;
	var	green = ((ene/8)+2) | 0;
	var	blue = ((ene/5)+5) | 0;
	var sample = +$('iSampledmg').value;

	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}
	var pontos = 100 + (280 * reset) + (exreset * 12) + (6 * (lvl-1)) - (str+agi+vit+ene);

	var iatasa = 0;
	var Tiatasa = 0;
	var idfasa = 0;
	var Tidfasa = 0;
	var absasa = 0;
	var Tabsasa = 0;

	switch(tasa){

		case 1:
		Tiatasa = 2;
		Tidfasa = 3;
		Tabsasa = 2;
		iatasa = 12;
		idfasa = 10;
		absasa = 12;
		speed += 15;
		break;

		case 2:
		Tiatasa = 1;
		Tidfasa = 2;
		Tabsasa = 1;
		iatasa = 32;
		idfasa = 45;
		absasa = 25;
		speed += 16;
		break;
	}

	iatasa += (Tiatasa * lasa); iatasa /= 100;
	absasa += (Tabsasa * lasa); absasa /= 100;
	var hp = 40+(lvl-1)+(vit*2);

	for (var i = 0; i < pvida; i++) {
		hp = (hp*1.05) | 0;
	}

	var mp = (6+(lvl*1.5)+(ene*1.5)) | 0;
	var ag = ((ene*0.2)+(vit*0.3)+(agi*0.2)+(str*0.3)) | 0 ;
	var def = (agi/10); def |= 0;
	def += (Tidfasa * lasa);
	sample -= def;
	sample = sample * (1-absasa) ; sample |= 0;

	for (var i = 0; i < pdimi; i++) {
		sample = (sample*0.96) | 0;
	}
	for (var i = 0; i < pddi; i++) {
		sample = (sample*0.93) | 0;
	}
	if(sample < 0) sample = 0;

	var speed = (agi/50) | 0;
	var sd = ((str+agi+vit+ene) * 1.2 + def / 2 + lvl*lvl/ 30) | 0;

	var mindmg = ((str/14) + (agi/7) + bowmin) * (1+(addpendant*0.02)) * (1+(addbow*0.02));
	mindmg += dmgbuff;
	mindmg *= (1+iatasa) * (1+(imp*0.3));
	mindmg |= 0;

	var maxdmg = ((str/8) + (agi/4) + bowmax) * (1+(addpendant*0.02)) * (1+(addbow*0.02));
	maxdmg += dmgbuff;
	maxdmg *= (1+iatasa) * (1+(imp*0.3));
	maxdmg |= 0;

	var excdmg = maxdmg * 1.20; excdmg |= 0;
	var pvmdr = (agi/4) | 0;
	var pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
	var pvpdr = (lvl*2+agi*0.1) | 0;
	var pvpar = (lvl*3+agi*0.6) | 0;

	for (var i = 0; i < ppvm; i++) {
		pvmdr = (pvmdr * 1.10) | 0;
	}

	$('oPontos').value = pontos;
	$('oMinDmg').value = mindmg;
	$('oMaxDmg').value = maxdmg;
	$('oExcDmg').value = excdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = pvmdr;
	$('oPvmAr').value = pvmar;
	$('oPvpDr').value = pvpdr;
	$('oPvpAr').value = pvpar;
	$('oBuffRed').value = red;
	$('oBuffGreen').value = green;
	$('oBuffBlue').value = blue;
}

function refreshMG(e){
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addstaff = +$('iSCStaff').checked;
	var addpendant = +$('iSCPendant').checked;
	var dmgbuff = 0;
	var defbuff = 0;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
	}
	var sample = +$('iSampledmg').value;
	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}
	var pontos = 100 + (340 * reset) + (exreset * 12) + (7 * (lvl-1)) - (str+agi+vit+ene);

	var iatasa = 0;
	var Tiatasa = 0;
	var idfasa = 0;
	var Tidfasa = 0;
	var absasa = 0;
	var Tabsasa = 0;

	switch(tasa){

		case 1:
		Tiatasa = 2;
		Tidfasa = 3;
		Tabsasa = 2;
		iatasa = 12;
		idfasa = 10;
		absasa = 12;
		speed += 15;
		break;

		case 2:
		Tiatasa = 1;
		Tidfasa = 2;
		Tabsasa = 1;
		iatasa = 32;
		idfasa = 45;
		absasa = 25;
		speed += 16;
		break;
	}

	iatasa += (Tiatasa * lasa); iatasa /= 100;
	absasa += (Tabsasa * lasa); absasa /= 100;

	var hp = 58+(lvl-1)+vit*2;

	for (var i = 0; i < pvida; i++) {
		hp = (hp*1.05) | 0;
	}

	var mp = (8+(lvl-1)+ene*2) | 0;
	var ag = ((ene*0.15)+(vit*0.3)+(agi*0.25)+(str*0.2)) | 0 ;

	var def = (agi/5) | 0;
	def += defbuff;
	def += (Tidfasa * lasa);
	sample -= def;
	sample = sample * (1-absasa) ; sample |= 0;

	for (var i = 0; i < pdimi; i++) {
		sample = (sample*0.96) | 0;
	}
	for (var i = 0; i < pddi; i++) {
		sample = (sample*0.93) | 0;
	}
	if(sample < 0) sample = 0;

	var speed = (agi/15) | 0;
	var sd = ((str+agi+vit+ene) * 1.2 + def / 2 + lvl*lvl/ 30) | 0;
	
	var minwizdmg = (ene / 9) * (1+(addpendant*0.02)) * (1+(addstaff*0.02)) * (1+staff);
	minwizdmg += dmgbuff;
	minwizdmg *= (1+iatasa) * (1+(imp*0.3));
	minwizdmg |= 0;

	var maxwizdmg = (ene / 4) * (1+(addpendant*0.02)) * (1+(addstaff*0.02)) * (1+staff);
	maxwizdmg += dmgbuff;
	maxwizdmg *= (1+iatasa) * (1+(imp*0.3));
	maxwizdmg |= 0;

	var excwizdmg = maxwizdmg * 1.20; excwizdmg |= 0;
	var pvmdr = (agi/3) | 0;
	var pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
	var pvpdr = (lvl*2+agi*0.25) | 0;
	var pvpar = (lvl*3+agi*3.5) | 0;

	for (var i = 0; i < ppvm; i++) {
		pvmdr = (pvmdr * 1.10) | 0;
	}

	$('oPontos').value = pontos;
	$('oMinDmg').value = minwizdmg;
	$('oMaxDmg').value = maxwizdmg;
	$('oExcDmg').value = excwizdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = pvmdr;
	$('oPvmAr').value = pvmar;
	$('oPvpDr').value = pvpdr;
	$('oPvpAr').value = pvpar;
}