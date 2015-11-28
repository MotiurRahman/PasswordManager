var db = Ti.Database.open('people');
db.execute('CREATE TABLE IF NOT EXISTS customer(id  integer PRIMARY KEY autoincrement not null,customer_id TEXT,title TEXT,description TEXT)');
db.close();

exports.add = function(customer_id,title, description) {
	var db = Ti.Database.open('people');
	db.execute('INSERT INTO customer (customer_id,title,description) VALUES(?,?,?)', customer_id,title,description);
	db.close();
};


exports.getinfo = function() {
	var customerInfo = [];
	var db = Ti.Database.open('people');
	var result = db.execute('select * from customer');

	while (result.isValidRow()) {

		customerInfo.push({

			id : result.fieldByName('id'),
			title : result.fieldByName('title'),
			description:result.fieldByName('description'),
			customer_id:result.fieldByName('customer_id'),
			
		});
		result.next();
	}

	result.close();
	db.close();
	//Ti.API.info('stuInfo'+ stuInfo);
	return customerInfo;
};


exports.updateinfo = function(title,description,customer_id) {
	var db = Ti.Database.open('people');
	db.execute('UPDATE customer set title=?,description=? where customer_id=?', title,description,customer_id);
	db.close();
};


exports.deletinfo = function(customer_id) {
	var db = Ti.Database.open('people');
	db.execute('DELETE FROM customer where customer_id=?', customer_id);
	db.close();
};
