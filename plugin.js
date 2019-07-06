"use strict";

const
youtube = '<div class="video-embed"><iframe src="//www.youtube.com/embed/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
youtubeList = '<div class="video-embed"><iframe src="//www.youtube.com/embed/?list=$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
youtubeMatch = /<a href.*youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]*).*<\/a>/g,
youtubeListMatch = /<a href.*youtu(?:.*\/v\/|.*list\=|\.be\/)([A-Za-z0-9_\-]*).*<\/a>/g;

exports.filterParsePost = function(data, callback) {
  if(!data || !data.postData || !data.postData.content) {
    return callback(null, data);
  }
  if(data.postData.content.match(youtubeListMatch)) {
    data.postData.content = data.postData.content.replace(youtubeListMatch, youtubeList);
  }
  if(data.postData.content.match(youtubeMatch)) {
    data.postData.content = data.postData.content.replace(youtubeMatch, youtube);
  }
  callback(null, data);
};
exports.staticAppLoad = function(data, callback) {
  console.log('Loading Jenkler Video embed plugin ' + require('./package.json').version);
  callback();
};
