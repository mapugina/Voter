document.write('<table>');
var x, y;
for (y = 9; y >= 0; --y){
	document.write('<tr>');
	for( x = 10; x >= 1; --x ) {
		color = (x + y) % 2;
		document.write('<td class = "square' + color+ '" id = "position' );

		var number;
		if (y % 2 == 1)
			number = (y * 10) + x;
		else
			number = (y * 10) - x + 11;
		
		document.write(number + '">' + number);				
		document.write('</td>');
	}
	document.write('</tr>');
}
document.write('</table>');

