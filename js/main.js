$(document).ready(function(){
	$('#searchUser').on('keyup', function(){
		var username = $(this).val();
		$.ajax('https://api.github.com/users/'+username, {
			data:{
				client_id: '974e938e26409a298d66',
				client_secret: '646e8f47ac3e2b0750266539ecaa50521878a774'
			},
			success: function(response){
				$('#profile').html(`
					<div class="panel panel-default">
					  <div class="panel-heading">
					    <h3 class="panel-title">${response.name}</h3>
					  </div>
					  <div class="panel-body">
					    <div class = "row">
					    	<div class = "col-md-3">
					    		<img class = "thumbnail avatar" src = "${response.avatar_url}">
					    		<a target = "_blank" href = "${response.html_url}" class = "btn btn-primary btn-block">View Profile</a>
					    	</div>
					    	<div class = "col-md-9">
					    		<span class="label label-default">Public Repos: ${response.public_repos}</span>
								<span class="label label-primary">Public Gists: ${response.public_gists}</span>
								<span class="label label-success">Followers: ${response.followers}</span>
								<span class="label label-info">Following: ${response.following}</span>
								<br><br>
								<ul class = "list-group">
									<li class = "list-group-item">Company: ${response.company}</li>
									<li class = "list-group-item">Website/Blog: ${response.blog}</li>
									<li class = "list-group-item">Location: ${response.location}</li>
									<li class = "list-group-item">Member Since: ${response.created_at}</li>
								</ul>
					    	</div>
					    </div>
					  </div>
					</div>	
					<h3 class = "page-header">List of repositories</h3>
					<div id = "repos"></div>
				`);
			}
		});
		$.ajax('https://api.github.com/users/'+username+'/repos', {
			data:{
				client_id: '974e938e26409a298d66',
				client_secret: '646e8f47ac3e2b0750266539ecaa50521878a774',
				per_page: 5,
				sort: "created: asc"
			},
			success:function(response){
				$.each(response, function(index,repo){
					$('#repos').append(`
						<div class = "well">
							<div class = "row">
								<div class = "col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class = "col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class = "col-md-2">
									<a href = "${repo.html_url}" class = "btn btn-default" target="_blank">Repo Page</a>
								</div>
							</div>
						</div>
					`)
				});
			}
		});
	});
});