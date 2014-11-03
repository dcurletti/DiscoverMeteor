Template.postSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				return alert(error.reason);
			} else if (result.postExists) {
				throwError('This link has already been posted')
			} else {
				Router.go('postPage', {_id:result._id})
			}
		})
	}
});

Template.postSubmit.created = function () {
	Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
	errorMessage: function (field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});