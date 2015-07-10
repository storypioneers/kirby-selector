
<input class="[ js-selector-storage ]" type="hidden" name="<?= $field->name() ?>" id="<?= $field->name() ?>" value="<?= implode(',', $field->value()) ?>" />

<div class="input input-with-items">
    <?php if ($field->files()->count() > 0): ?>
        <?php foreach ($field->files() as $file): ?>
            <div id="<?= $field->itemId($file) ?>" class="item item-with-image [ selector-item js-selector-item ]" data-file="<?= $file->filename() ?>" <?= r($field->isInValue($file), 'data-checked="true"') ?> >
                <div class="item-content">
                    <?php if ($file->type() == 'image'): ?>
                        <figure class="item-image">
                            <a class="item-image-container" href="<?= purl($file, 'show') ?>">
                                <?= thumb($file, array('width' => 48, 'height' => 48, 'crop' => true)) ?>
                            </a>
                        </figure>
                    <?php else: ?>
                        <figure class="item-image  item-filetype">
                            <a class="item-image-container" href="<?= purl($file, 'show') ?>">
                                <?= strtoupper($file->extension()) ?>
                            </a>
                        </figure>
                    <?php endif ?>
                    <div class="item-info">
                        <strong class="item-title">
                            <a href="<?= purl($file, 'show') ?>">
                                <?= $file->filename() ?>
                            </a>
                        </strong>
                        <small class="item-meta marginalia">
                            <?= $file->type() ?> / <?= $file->niceSize() ?>
                            <?php if ($file->type() == 'image'): ?>
                                / <?= $file->width() ?> x <?= $file->height() ?>
                            <?php endif ?>
                        </small>
                    </div>
                </div>
                <nav class="item-options">
                    <ul class="nav nav-bar">
                        <li>
                            <a class="btn btn-with-icon [ selector-checkbox js-selector-checkbox ]" href="">
                                <i class="icon icon-left fa fa-circle-o"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        <?php endforeach ?>
    <?php else: ?>
        <div class="item selector-item-empty">
            <?php echo l::get('selector.empty') ?>
        </div>
    <?php endif ?>
</div>
