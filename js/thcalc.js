async function Calculate() {
var THCPerc = parseFloat(document.getElementById('thcperc').value);
var THCPerc877 = Math.round(THCPerc * 0.877);
//var THCGram = THCPerc / 0.1;
var THCGram = parseFloat(THCPerc877 / 0.1); // / 0.1;
var THCHalfG = parseFloat(THCGram / 2);
var THC8th = parseFloat(THCGram * 3.5);
var THCQuarter = parseFloat(THCGram * 7);
var THCHalfZ = parseFloat(THCGram * 14);
var THCOunce = parseFloat(THCGram * 28);
var THCQuartG = parseFloat(THCGram / 4);
var THCTwoTenths = parseFloat(THCGram / 5);
var THCTenth = parseFloat(THCGram / 10);
var THCHalfTen = parseFloat(THCGram / 20);
$(" div.log ").html(String(THCPerc) + "% THC<br>One Gram (1g) = " + 
"<span class='TY'>" + String(THCGram) + " mg</span><span class='TG'> of THC Available</span> in about 1,000 miligrams" +
"<br>Half Gram (0.5g) = <span class='TY'>" + String(THCHalfG) + " mg</span> <span class='TG'>of THC Available</span> in about 500 mg" +
"<br>An 8th (3.5g) = <span class='TY'>" + String(THC8th) + " mg</span><span class='TG'> of THC Available</span> in about 3,500 mg" +
"<br>A Quarter Oz (7g) = <span class='TY'>" + String(THCQuarter) + " mg</span><span class='TG'> of THC Available</span> in about 7,000 mg" +
"<br>A Half Oz (14g) = <span class='TY'>" + String(THCHalfZ) + " mg</span><span class='TG'> of THC Available</span> in about 14,000 mg" +
"<br>One Ounce (28g) = <span class='TY'>" + String(THCOunce) + " mg</span><span class='TG'> of THC Available</span> in about 28,000 mg" + 
"<br>Quarter Gram (0.25g) = <span class='TY'>" + String(THCQuartG) + " mg</span><span class='TG'> of THC Available</span> in about 250 mg" + 
"<br>Two Tenths (0.20g) = <span class='TY'>" + String(THCTwoTenths) + " mg</span><span class='TG'> of THC Available</span> in about 200 mg" + 
"<br>One Tenth (0.10g) = <span class='TY'>" + String(THCTenth) + " mg</span><span class='TG'> of THC Available</span> in about 100 mg" + 
"<br>Half Tenth (0.05g) = <span class='TY'>" + String(THCHalfTen) + " mg</span><span class='TG'> of THC Available</span> in about 50 mg");
};