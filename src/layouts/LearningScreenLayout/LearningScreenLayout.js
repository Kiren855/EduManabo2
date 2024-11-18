import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LearningScreenLayout.module.scss';
import LearningScreen from '~/pages/LearningScreen';

const cx = classNames.bind(styles);


function LearningScreenLayout({ children }) {
    return (
        <div className={cx('container-learning')}>
            <LearningScreen />
        </div>
    );
}

LearningScreenLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LearningScreenLayout;