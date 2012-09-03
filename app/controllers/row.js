var args = arguments[0] || {};
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//
$.thumbnail.image = args.image;
$.user.text = args.user || '';
$.tweet.text = args.text || '';
