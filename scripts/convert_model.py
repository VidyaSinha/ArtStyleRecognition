import tensorflow as tf

model = tf.keras.models.load_model("public/art_style_classifier_BetterDA.keras", compile=False)

for layer in model.layers:
    if isinstance(layer, tf.keras.layers.InputLayer):
        # Update the input layer configuration to remove batch_shape
        layer.batch_input_shape = (None, 224, 224, 3)

model.save("public/art_style_classifier_BetterDA.h5")
