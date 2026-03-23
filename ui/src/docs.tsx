import React from 'react';
import { ConfigDoc } from '@/types';
import { IoFlaskSharp } from 'react-icons/io5';

const docs: { [key: string]: ConfigDoc } = {
  'config.name': {
    title: '训练名称',
    description: (
      <>
        训练任务的名称。该名称将用于在系统中标识任务，并作为最终模型的文件名。它必须唯一，且只能包含字母、数字、下划线和连字符，不允许有空格或特殊字符。
      </>
    ),
  },
  gpuids: {
    title: 'GPU ID',
    description: (
      <>
        用于训练的 GPU。目前通过 UI 一次只能使用一个 GPU。不过，你可以同时启动多个任务，每个任务使用不同的 GPU。
      </>
    ),
  },
  'config.process[0].trigger_word': {
    title: '触发词',
    description: (
      <>
        可选：用于触发你概念或角色的词或标记。
        <br />
        <br />
        使用触发词时，如果你的标题中不包含触发词，它将自动添加到标题的开头。如果你没有标题，标题将仅成为触发词。如果你想在标题的不同位置放置触发词，可以在标题中使用 <code>{'[trigger]'}</code> 占位符。它将被自动替换为你的触发词。
        <br />
        <br />
        触发词不会自动添加到你的测试提示词中，因此你需要手动添加触发词，或者在测试提示词中也使用 <code>{'[trigger]'}</code> 占位符。
      </>
    ),
  },
  'config.process[0].model.name_or_path': {
    title: '名称或路径',
    description: (
      <>
        Huggingface 上的 diffusers 仓库名称，或者要训练的基础模型的本地路径。对于大多数模型，文件夹需要采用 diffusers 格式。对于某些模型（如 SDXL 和 SD1），你可以在这里放置一个 safetensors 检查点的路径。
      </>
    ),
  },
  'datasets.control_path': {
    title: '控制数据集',
    description: (
      <>
        控制数据集需要有与训练数据集文件名匹配的文件。它们应该是成对匹配的文件。这些图像将在训练期间作为控制/输入图像输入。控制图像将被调整大小以匹配训练图像。
      </>
    ),
  },
  'datasets.multi_control_paths': {
    title: '多控制数据集',
    description: (
      <>
        控制数据集需要有与训练数据集文件名匹配的文件。它们应该是成对匹配的文件。这些图像将在训练期间作为控制/输入图像输入。
        <br />
        <br />
        对于多控制数据集，控制将按所列顺序依次应用。如果模型不要求图像具有相同宽高比（例如 Qwen/Qwen-Image-Edit-2509），则控制图像不需要与目标图像的大小或宽高比匹配，它们将自动调整为模型/目标图像的理想分辨率。
      </>
    ),
  },
  'datasets.num_frames': {
    title: '帧数',
    description: (
      <>
        这会将视频数据集中的视频缩减为指定帧数。如果该数据集是图像，则将此值设为 1 表示单帧。如果数据集只有视频，则会从数据集中的视频中均匀提取帧。
        <br />
        <br />
        最好在训练前将视频裁剪到合适的长度。Wan 模型是 16 帧/秒。81 帧将产生 5 秒的视频。因此，为了获得最佳效果，你希望所有视频都裁剪到大约 5 秒。
        <br />
        <br />
        示例：将此值设为 81，并且数据集中有 2 个视频，一个长 2 秒，另一个长 90 秒，那么每个视频将提取 81 个均匀间隔的帧，导致 2 秒的视频看起来变慢，而 90 秒的视频看起来非常快。
      </>
    ),
  },
  'datasets.do_i2v': {
    title: '启用 I2V',
    description: (
      <>
        对于可以处理 I2V（图像到视频）和 T2V（文本到视频）的视频模型，此选项将该数据集设置为作为 I2V 数据集进行训练。这意味着将从视频中提取第一帧，并用作视频的起始图像。如果未设置此选项，该数据集将被视为 T2V 数据集。
      </>
    ),
  },
  'datasets.do_audio': {
    title: '启用音频',
    description: (
      <>
        对于支持视频和音频的模型，此选项将从视频中加载音频并将其调整为与视频序列匹配。由于视频会自动调整大小，音频可能会降低或升高音调以匹配视频的新速度。在训练前准备好数据集以使其具有正确的长度非常重要。
      </>
    ),
  },
  'datasets.audio_normalize': {
    title: '音频归一化',
    description: (
      <>
        加载音频时，这会将音频音量归一化到最大峰值。如果你的数据集音量不一致，此功能很有用。警告：如果你有要保持完全静音的片段，请不要使用此选项，因为它会提高这些片段的音量。
      </>
    ),
  },
  'datasets.audio_preserve_pitch': {
    title: '保持音调',
    description: (
      <>
        加载音频以匹配请求的帧数时，如果长度与训练目标不匹配，此选项将保持音频的音调。建议数据集与目标长度匹配，因为此选项可能会引入声音失真。
      </>
    ),
  },
  'datasets.flip': {
    title: '水平翻转和垂直翻转',
    description: (
      <>
        你可以通过沿 X（水平）和/或 Y（垂直）轴翻转来即时增强数据集。单轴翻转将使数据集大小翻倍。它将训练正常图像和翻转版本的图像。这很有帮助，但请记住它也可能具有破坏性。没有理由训练颠倒的人像，翻转面部可能会使模型困惑，因为人的右侧与左侧并不相同。对于文本，翻转文本显然不是好主意。
        <br />
        <br />
        数据集的控制图像也将被翻转以匹配图像，因此它们将在像素级别上始终匹配。
      </>
    ),
  },
  'train.unload_text_encoder': {
    title: '卸载文本编码器',
    description: (
      <>
        卸载文本编码器将缓存触发词和样本提示，并将文本编码器从 GPU 中卸载。数据集中的标题将被忽略。
      </>
    ),
  },
  'train.cache_text_embeddings': {
    title: '缓存文本嵌入',
    description: (
      <>
        <small>(实验性)</small>
        <br />
        缓存文本嵌入将处理文本编码器的所有文本嵌入并将其缓存到磁盘。文本编码器将从 GPU 中卸载。这不适用于动态更改提示的功能，如触发词、标题丢弃等。
      </>
    ),
  },
  'model.multistage': {
    title: '训练阶段',
    description: (
      <>
        一些模型具有多阶段网络，在去噪过程中分别训练和使用。最常见的是有两个阶段：一个用于高噪声，一个用于低噪声。你可以选择同时训练两个阶段，或分别训练。如果同时训练，训练器将每隔一定步数交替训练每个模型，并输出两个不同的 LoRA。如果选择只训练一个阶段，训练器将只训练该阶段并输出一个 LoRA。
      </>
    ),
  },
  'train.switch_boundary_every': {
    title: '切换间隔',
    description: (
      <>
        在训练多阶段模型时，此设置控制训练器切换训练每个阶段的频率。
        <br />
        <br />
        对于低显存设置，未训练的模型将从 GPU 中卸载以节省内存。这需要一些时间，因此建议在低显存时减少切换频率。推荐使用 10 或 20 这样的设置。
        <br />
        <br />
        切换发生在批次级别，意味着它会在梯度累积步骤之间切换。要在一个步骤中同时训练两个阶段，请将切换间隔设为 1，并将梯度累积设为 2。
      </>
    ),
  },
  'train.force_first_sample': {
    title: '强制首次采样',
    description: (
      <>
        此选项将强制训练器在启动时生成样本。训练器通常只会在尚未训练任何内容时生成首次样本，但在从现有检查点恢复时不会生成首次样本。此选项强制每次启动训练器时都生成首次样本。如果你更改了样本提示并希望立即看到新提示，这将非常有用。
      </>
    ),
  },
  'model.layer_offloading': {
    title: (
      <>
        层级卸载{' '}
        <span className="text-yellow-500">
          ( <IoFlaskSharp className="inline text-yellow-500" name="Experimental" /> 实验性)
        </span>
      </>
    ),
    description: (
      <>
        这是一个基于{' '}
        <a className="text-blue-500" href="https://github.com/lodestone-rock/RamTorch" target="_blank">
          RamTorch
        </a>{' '}
        的实验性功能。此功能还处于早期阶段，会有很多更新和更改，请注意它可能无法在不同版本间稳定工作。它也仅适用于某些模型。
        <br />
        <br />
        层级卸载使用 CPU 内存而非 GPU 内存来存储大部分模型权重。这允许在较小的 GPU 上训练更大的模型，前提是你有足够的 CPU 内存。这比在纯 GPU 内存上训练慢，但 CPU 内存更便宜且可升级。你仍然需要 GPU 内存来存储优化器状态和 LoRA 权重，因此通常仍需要较大的显卡。
        <br />
        <br />
        你还可以选择卸载的层百分比。为了获得最佳性能，通常建议尽可能少卸载（接近 0%），但如果需要更多内存，可以卸载更多。
      </>
    ),
  },
  'model.qie.match_target_res': {
    title: '匹配目标分辨率',
    description: (
      <>
        此设置将使控制图像匹配目标图像的分辨率。Qwen-Image-Edit-2509 的官方推理示例中，无论生成的大小如何，控制图像都以 1MP 分辨率输入。这会使较低分辨率训练变得困难，因为无论目标图像多大，控制图像都以 1MP 输入。匹配目标分辨率将使控制图像的分辨率与目标匹配，允许你在训练较小分辨率时使用更少的显存。你仍然可以使用不同的宽高比，图像将被调整大小以匹配目标图像的像素数。
      </>
    ),
  },
  'train.diff_output_preservation': {
    title: '差异输出保持',
    description: (
      <>
        差异输出保持（DOP）是一种帮助在训练期间保留训练概念类别知识的技术。为此，你必须设置一个触发词来区分你的概念与其类别。例如，你可能在训练一个名叫 Alice 的女性。触发词可能是 "Alice"。类别是 "woman"，因为 Alice 是一个女人。我们希望在教授模型关于 Alice 的差异时，模型能记住它知道的关于类别 "woman" 的知识。在训练期间，训练器将绕过你的 LoRA 进行一次预测，并将提示中的触发词替换为类别词。这样 "photo of Alice" 就变成了 "photo of woman"。这个预测称为先验预测。每一步，我们将进行正常的训练步骤，同时使用先验预测和类别提示进行另一个步骤，以教导我们的 LoRA 保留类别的知识。这不仅应提高训练概念的性能，还能让你做诸如 "Alice 站在一个女人旁边" 这样的操作，而不会使两个人都看起来像 Alice。
      </>
    ),
  },
  'train.blank_prompt_preservation': {
    title: '空白提示保持',
    description: (
      <>
        空白提示保持（BPP）是一种帮助保留当前模型在无提示时的知识的技术。这不仅有助于模型变得更加灵活，还能提高推理期间概念的质量，尤其是在使用 CFG（无分类器引导）时。在训练的每一步，使用空白提示和禁用的 LoRA 进行一次先验预测。然后，将此预测用作空白提示下额外训练步骤的目标，以保留模型在没有提示时的知识。这有助于模型避免过度拟合提示，保持其泛化能力。
      </>
    ),
  },
  'train.do_differential_guidance': {
    title: '差分引导',
    description: (
      <>
        差分引导将在训练期间放大模型预测与目标之间的差异，从而生成一个新目标。差分引导比例是差异的乘数。这仍处于实验阶段，但在我的测试中，它使模型训练更快，并且在所有测试场景中都能更好地学习细节。
        <br />
        <br />
        其思想是，正常训练会逐步接近目标，但受限于学习率，永远无法真正达到目标。使用差分引导，我们放大差异以获得超越实际目标的新目标，这将使模型学会击中或超过目标，而不是达不到目标。
        <br />
        <br />
        <img src="/imgs/diff_guidance.png" alt="差分引导示意图" className="max-w-full mx-auto" />
      </>
    ),
  },
  'dataset.num_repeats': {
    title: '重复次数',
    description: (
      <>
        重复次数允许你将数据集中的项目重复多次。当你使用多个数据集并希望平衡每个数据集的样本数时，这非常有用。例如，如果你有一个包含 10 张图像的小数据集和一个包含 100 张图像的大数据集，你可以将小数据集的重复次数设为 10，使其有效变成 100 张图像，从而使两个数据集在训练中出现的频率相等。
      </>
    ),
  },
  'train.audio_loss_multiplier': {
    title: '音频损失乘数',
    description: (
      <>
        在同时训练音频和视频时，有时视频损失太大，超过了音频损失，导致音频失真。如果你注意到这种情况，可以增加音频损失乘数，赋予音频损失更多权重。可以尝试 2.0、10.0 等。警告：设置过高可能导致过拟合并损害模型。
      </>
    ),
  },
  'datasets.auto_frame_count': {
    title: 'Auto Frame Count',
    description: (
      <>
        This will automatically determine the number of frames to use for each video in your dataset instead of relying
        on a fixed num_frames. This allows you to include videos of different lengths in the dataset, and each video
        will be processed without speeding up or slowing down. Be careful about adding long videos into your dataset, as
        they use up more VRAM. This currently will not work with a batch size greater than 1.
      </>
    ),
  },
};

export const getDoc = (key: string | null | undefined): ConfigDoc | null => {
  if (key && key in docs) {
    return docs[key];
  }
  return null;
};

export default docs;