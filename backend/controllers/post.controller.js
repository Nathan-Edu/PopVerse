const Post = require('../models/post.model');

// Criar uma nova publicação
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      user: req.user.id
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar publicação' });
  }
};

// Obter todas as publicações
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name profileImage');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar publicações' });
  }
};

// Obter uma publicação específica pelo ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name profileImage');
    if (!post) return res.status(404).json({ error: 'Publicação não encontrada' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar publicação' });
  }
};

// Atualizar publicação
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicação não encontrada' });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para editar esta publicação' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar publicação' });
  }
};

// Deletar publicação
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicação não encontrada' });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta publicação' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Publicação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir publicação' });
  }
};

// Curtir ou descurtir publicação
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicação não encontrada' });

    const userId = req.user.id;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao curtir publicação' });
  }
};

// Comentar publicação
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicação não encontrada' });

    const comment = {
      user: req.user.id,
      text: req.body.text,
      timestamp: new Date()
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
};