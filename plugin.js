'use strict';

const vimeo = '<div class="video-embed"><iframe allowfullscreen src="https://player.vimeo.com/video/$1?byline=0&portrait=0&title=0&transparent=0"></iframe></div>';
const vimeoMatch = /<a href.*(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?).*<\/a>/g;
const youtube = '<div class="video-embed"><iframe allowfullscreen src="//www.youtube.com/embed/$1"></iframe></div>';
const youtubeList = '<div class="video-embed"><iframe allowfullscreen src="//www.youtube.com/embed/?list=$1"></iframe></div>';
const youtubeListMatch = /<a href.*youtu(?:.*list\=)([A-Za-z0-9_\-]*).*<\/a>/g;
const youtubeMatch = /<a href.*youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]*).*<\/a>/g;

exports.filterParsePost = async (data) => {
  if(!data?.postData?.content ?? '') return data;
  data.postData.content = data.postData.content.replace(vimeoMatch, vimeo);
  data.postData.content = data.postData.content.replace(youtubeListMatch, youtubeList);
  data.postData.content = data.postData.content.replace(youtubeMatch, youtube);
  return data;
};
exports.filterSanitizeConfig = async (data) => {
  data.allowedAttributes.iframe.push('allowfullscreen');
  return data;
}
exports.staticAppLoad = async (data) => {
  console.log('Loading Jenkler Video Embed plugin ' + require('./package.json').version);
};
