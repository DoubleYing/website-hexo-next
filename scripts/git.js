require('shelljs/global');

try {
	hexo.on('deployAfter', function() {//当deploy完成后执行备份
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

// time panel
function add0 (i) {
	if (i<10) {
		i = "0" + i;
	}
	return i;
}

function run() {
	if (!which('git')) {
		echo('Sorry, this script requires git');
		exit(1);
	} else {
		echo("======================Auto Backup Begin===========================");
		cd('~/Documents/website-hexo-next');    //此处修改为Hexo根目录路径
		if (exec('git add --all').code !== 0) {
			echo('Error: Git add failed');
			exit(1);

		}
		dt = new Date();
		year = dt.getFullYear();
		month = dt.getMonth()+1;
		date = dt.getDate();
		hour = dt.getHours();
		minute = dt.getMinutes();
		second = dt.getSeconds();
		month_string = add0(month);
		date_string = add0(date);
		hour_string = add0(hour);
		minute_string = add0(minute);
		second_string = add0(second);
		time_string = year+'/'+month_string+'/'+date_string+' '+hour_string+':'+minute_string+':'+second_string;
		if (exec('git commit -am "Form auto backup script\'s commit - ' + time_string +'"').code !== 0) {
			echo('Error: Git commit failed');
			exit(1);

		}
		if (exec('git push origin master').code !== 0) {
			echo('Error: Git push failed');
			exit(1);

		}
		echo("==================Auto Backup Complete============================")
	}
}
