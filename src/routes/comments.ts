/* 
pre structure

top-level comments

const topLevelComments = await CommentModel.find({ post_id: yourPostId, parentComment_id: null }).populate('user_id');

replies for a specific comment

const commentId = yourCommentId; // the parent comment's ID
const replies = await CommentModel.find({ post_id: yourPostId, parentComment_id: commentId }).populate('user_id');

*/