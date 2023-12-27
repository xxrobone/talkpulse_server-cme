// voting system

/* 

export const upvote = async (req: Request, res: Response) => {
    const { targetType, targetId } = req.params;
    const { userId } = req;

    assertDefined(userId);

    try {
        let target;

        if (targetType === "post") {
            target = await Post.findById(targetId);
        } else if (targetType === "comment") {
            target = await Comment.findById(targetId);
        } else {
            return res.status(400).json({ message: 'Invalid target type' });
        }

        if (!target) {
            return res.status(404).json({ message: `Target not found with the ID: ${targetId}` });
        }

        // Check if the user has already upvoted
        if (target.upvotes.includes(userId)) {
            return res.status(400).json({ message: `User has already upvoted this ${targetType}.` });
        }

        // Check if the user has previously downvoted
        if (target.downvotes.includes(userId)) {
            target.downvotes.pull(userId);
        }

        // Add the user to the upvotes array
        target.upvotes.push(userId);

        // Save the updated target
        const upvotedTarget = await target.save();

        return res.status(200).json(upvotedTarget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const downvote = async (req: Request, res: Response) => {
    const { targetType, targetId } = req.params;
    const { userId } = req;

    assertDefined(userId);

    try {
        let target;

        if (targetType === "post") {
            target = await Post.findById(targetId);
        } else if (targetType === "comment") {
            target = await Comment.findById(targetId);
        } else {
            return res.status(400).json({ message: 'Invalid target type' });
        }

        if (!target) {
            return res.status(404).json({ message: `Target not found with the ID: ${targetId}` });
        }

        // Check if the user has already downvoted
        if (target.downvotes.includes(userId)) {
            return res.status(400).json({ message: `User has already downvoted this ${targetType}.` });
        }

        // Check if the user has previously upvoted
        if (target.upvotes.includes(userId)) {
            target.upvotes.pull(userId);
        }

        // Add the user to the downvotes array
        target.downvotes.push(userId);

        // Save the updated target
        const downvotedTarget = await target.save();

        return res.status(200).json(downvotedTarget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
 */