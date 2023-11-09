import { computed } from 'vue';
import useRender from '../../hooks/useRender';

// Styles
import './SkeletonLoader.scss';

export const rootTypes = {
  'agenda-card': 'image, text@3',
  actions: 'button@2',
  article: 'heading, paragraph',
  avatar: 'avatar',
  button: 'button',
  card: 'image, heading',
  'card-avatar': 'image, list-item-avatar',
  chip: 'chip',
  divider: 'divider',
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': 'avatar, text',
  'list-item-two-line': 'sentences',
  'list-item-avatar-two-line': 'avatar, sentences',
  'list-item-three-line': 'paragraph',
  'list-item-avatar-three-line': 'avatar, paragraph',
  paragraph: 'text@3',
  sentences: 'text@2',
  subtitle: 'text',
  text: 'text',
};

function genBone(type, children) {
  return (
    <div class={['skeleton-loader__bone', `skeleton-loader__${type}`]}>
      {children}
    </div>
  );
}

function genBones(bone) {
  // e.g. 'text@3'
  const [type, length] = bone.split('@');

  // Generate a length array based upon
  // value after @ in the bone string
  return Array.from({ length }).map(() => genStructure(type));
}

function genStructure(type) {
  let children = [];

  if (!type) return children;

  const bone = rootTypes[type];

  // End of recursion, do nothing
  /* eslint-disable-next-line no-empty, brace-style */
  if (type === bone) {
  }
  // Array of values - e.g. 'heading, paragraph, text@2'
  else if (type.includes(',')) return mapBones(type);
  // Array of values - e.g. 'paragraph@4'
  else if (type.includes('@')) return genBones(type);
  // Array of values - e.g. 'card@2'
  else if (bone.includes(',')) children = mapBones(bone);
  // Array of values - e.g. 'list-item@2'
  else if (bone.includes('@')) children = genBones(bone);
  // Single value - e.g. 'card-heading'
  else if (bone) children.push(genStructure(bone));

  return [genBone(type, children)];
}

function mapBones(bones) {
  // Remove spaces and return array of structures
  return bones.replace(/\s/g, '').split(',').map(genStructure);
}

export default {
  props: {
    boilerplate: Boolean,
    color: String,
    loading: Boolean,
    loadingText: {
      type: String,
      default: '',
    },
    type: {
      type: [String, Array],
      default: 'image',
    },
    maxWidth: [Number, String],
  },
  setup(props, { slots }) {
    const wrapInArray = (v) => {
      return v == null ? [] : Array.isArray(v) ? v : [v];
    };
    const items = computed(() =>
      genStructure(wrapInArray(props.type).join(','))
    );
    useRender(() => {
      const isLoading = !slots.default || props.loading;

      return (
        <div
          class={[
            'skeleton-loader',
            {
              'skeleton-loader--boilerplate': props.boilerplate,
            },
            // themeClasses.value,
            // backgroundColorClasses.value,
            // elevationClasses.value,
          ]}
          // style={[
          //   `${Number(props.maxWidth)}px`,
          //   //backgroundColorStyles.value,
          //   isLoading ? `${Number(props.maxWidth)}px` : {},
          // ]}
          aria-busy={!props.boilerplate ? isLoading : undefined}
          aria-live={!props.boilerplate ? 'polite' : undefined}
          aria-label={!props.boilerplate ? props.loadingText : undefined}
          role={!props.boilerplate ? 'alert' : undefined}
        >
          {isLoading ? items.value : slots.default?.()}
        </div>
      );
    });

    return {};
  },
};
