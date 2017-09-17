---
title: Code Recommendation Project
date: 2016-11-12 20:31:17
description: Website of Code Recommendation with Natural Language Tags and Other Heterogeneous Data
tags: [Code Recommendation, Recommender Systems]
categories: [Recommendation] 
---

## Project

Please visit the project on [Github](https://github.com/qiufengyu/StackOverflow).

## Dataset

[Download](https://pan.baidu.com/s/1c2HtxE4) (Extracting Code: 8ftm)

We collect the data from [CodeReview Community](http://codereview.stackexchange.com/) by early October, 2016. These data include

* 6, 151 codes with over 50 views
* 3, 839 related users

The records before May, 2016 are in the training set while records after that are in the devloping set. We also make a test set including those posts on community from August to October.

The example of the code item in community

![code](codeentity.png)

The example of the user item in community

![user](userentity.png)

The structure of the item of code and user

![structure](structure.png)

## Proposed Framework

We get the predicted score synthesized by all components extracted by the heterogeneous data, the recommendation decision is controlled by a threshold.

![framework](model.png)

## Contact

Email: qiufengyu1024@gmail.com

Should you have any comments, let me know!
​		
​	





